
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import bulmaCollapsible from '@creativebulma/bulma-collapsible';
import { BehaviorSubject, Observable, map, tap } from "rxjs";

import { Task } from "src/app/shared/models/task";
import { TaskCategory } from "src/app/shared/models/taskCategory";
import { User } from "src/app/shared/models/user";
import { TaskService } from "src/app/shared/services/task.service";
import { UserService } from "src/app/shared/services/user.service";

@Component({
    selector: "app-user-view",
    templateUrl: "user-view.template.html",
})
export class UserViewComponent implements OnInit {

    user: User | null = null;

    tasks!: Observable<Task[]>;

    categories: Observable<TaskCategory[]> = this.taskService.getTaskCategories();

    filterCategory: TaskCategory | null = null;

    constructor(private userService: UserService, private taskService: TaskService,
        private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.userService.findById(this.route.snapshot.params["id"] as number)
            .pipe(
                tap(user => this.user = user)
            )
            .subscribe({
                next: (user) => {
                    this.tasks = this.taskService.getUserTasks(user);
                },
                error: (err: Error) => {
                    if (err instanceof HttpErrorResponse && err.status === 404) {
                        this.router.navigate(["/users"]);
                        return;
                    }
                    console.error(err.message);
                },
                complete: () => {
                    const collapsible = bulmaCollapsible.attach(".is-collapsible")[0];
                    setTimeout(() => collapsible.expand(), 150);
                    this.loadModals();
                }
            });
    }

    private loadModals() {
        document.dispatchEvent(new Event("loadModals"));
    }

    getImg(user: User) {
        return user.imgUrl ?? this.userService.defautImgUrl;
    }

    getTaskCategory(id: number) {
        return this.taskService.findTaskCategoryById(id);
    }

    filterTasks(completed: boolean) {
        let predicate = (task: Task) => (task.completed === completed) && (this.filterCategory ? task.categoryId === this.filterCategory?.id : true);
        return this.tasks?.pipe(
            map((tasks) => tasks.filter(predicate)),
        );
    }

    deleteTask(id: number) {
        this.taskService.deleteTask(id)
            .subscribe(() => this.loadModals());
    }

    toggleCollapsible(event: MouseEvent) {
        const elem = (event.target as HTMLElement);
        const header = elem.offsetParent?.querySelector(".card-header");
        header?.classList.toggle("is-active", !elem.classList.contains("is-active"));
    }

}
