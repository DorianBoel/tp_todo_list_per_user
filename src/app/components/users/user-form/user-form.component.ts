import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/shared/services/user.service";

@Component({
    selector: "app-user-form",
    templateUrl: "user-form.template.html",
})
export class UserFormComponent {

    title: string = "Enregistrement d'un nouvel utilisateur";

    user?: User;

    formGroup!: FormGroup;

    previewSrc: string = "";

    constructor(private userService: UserService, private formBuilder: FormBuilder,
        private router: Router, private route: ActivatedRoute) {
        if (this.route.snapshot.params.id) {
            this.title = "Modification du profil utilisateur";
            this.userService.findById(this.route.snapshot.params.id as number)
                .subscribe({
                    next: (user) => {
                        this.user = user;
                        this.initForm();
                    },
                    error: (err: Error) => {
                        if (err instanceof HttpErrorResponse && err.status === 404) {
                            this.router.navigate(["/users/add"]);
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
        this.formGroup = this.formBuilder.group({
            name: [this.user?.username ?? "", Validators.required],
            email: [this.user?.email ?? "", [Validators.required, Validators.email]],
            profileImg: [this.user?.imgUrl ?? ""],
        });
        this.updatePreview();
    }

    getFormControl(controlName: string): AbstractControl {
        return this.formGroup.controls[controlName];
    }

    showFormFeedback(controlName: string) {
        const control = this.getFormControl(controlName);
        return control.invalid && (control.dirty || control.touched);
    }

    updatePreview() {
        this.previewSrc = this.getFormControl('profileImg').value?.trim() || this.userService.defautImgUrl;
    }

    previewFallback(event: Event) {
        (event.target as HTMLImageElement).src = this.userService.defautImgUrl;
    }

    submitForm() {
        if (!this.formGroup.valid) {
            return this.formGroup.markAllAsTouched();
        }
        const request = (user: User) => this.user ? this.userService.updateUser(user) : this.userService.addUser(user);
        request(new User({
            id: this.user?.id,
            username: this.getFormControl("name").value.trim(),
            email: this.getFormControl("email").value.trim(),
            imgUrl: this.getFormControl("profileImg").value.trim() || undefined,
        }))
        .subscribe({
            next: () => this.router.navigate(["/users"]),
            error: (err) => console.error(err),
        });
    }

}
