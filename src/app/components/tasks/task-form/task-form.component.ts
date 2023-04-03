import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap, tap } from "rxjs";

import { FormComponentInterface } from "src/app/shared/models/formComponentInterface";
import { Task } from "src/app/shared/models/task";
import { TaskCategory } from "src/app/shared/models/taskCategory";
import { User } from "src/app/shared/models/user";
import { TaskService } from "src/app/shared/services/task.service";
import { UserService } from "src/app/shared/services/user.service";

@Component({
    selector: "app-task-form",
    templateUrl: "task-form.template.html",
})
export class TaskFormComponent implements FormComponentInterface {

    title = "Création d'une nouvelle tâche";

    task?: Task;

    formGroup!: FormGroup;

    categories!: TaskCategory[];

    users!: User[];

    constructor(private taskService: TaskService, private userService: UserService,
        private formBuilder: FormBuilder, private router: Router,
        private route: ActivatedRoute) {
        if (this.route.snapshot.params.id) {
            this.title = "Modification d'une tâche";
            this.taskService.findById(this.route.snapshot.params.id as number)
                .subscribe({
                    next: (task) => {
                        this.task = task;
                        this.initForm();
                    },
                    error: (err: Error) => {
                        if (err instanceof HttpErrorResponse && err.status === 404) {
                            this.router.navigate(["/tasks/add"]);
                            return;
                        }
                        console.error(err.message);
                    },
                });
        } else {
            this.initForm();
        }
    }

    private initForm() {
        this.taskService.getTaskCategories()
            .pipe(
                tap((categories) => this.categories = categories),
                switchMap(() => this.userService.getUsers()),
                tap((users) => this.users = users),
            )
            .subscribe({
                next: () => {
                    this.formGroup = this.formBuilder.group({
                        name: [this.task?.name ?? "", Validators.required],
                        category: [this.task?.categoryId ?? null, Validators.required],
                        user: [this.task?.userId ?? null, Validators.required],
                    });
                    if (this.task) {
                        this.formGroup.addControl("completed", new FormControl(this.task.completed));
                    }
                },
                error: (err) => console.error(err),
            });
    }

    getFormControl(controlName: string): AbstractControl {
        return this.formGroup.controls[controlName];
    }

    showFormFeedback(controlName: string) {
        const control = this.getFormControl(controlName);
        return control.invalid && (control.dirty || control.touched);
    }

    submitForm() {
        if (!this.formGroup.valid) {
            return this.formGroup.markAllAsTouched();
        }
        const request = (task: Task) => this.task ? this.taskService.updateTask(task) : this.taskService.addTask(task);
        request(new Task({
            id: this.task?.id,
            name: this.getFormControl("name").value.trim(),
            categoryId: this.getFormControl("category").value,
            userId: this.getFormControl("user").value,
            completed: this.getFormControl("completed")?.value ?? false,
        }))
        .subscribe({
            next: (task) => this.router.navigate([`/users/view/${task.userId}`]),
            error: (err: Error) => console.error(err),
        });
    }

}
