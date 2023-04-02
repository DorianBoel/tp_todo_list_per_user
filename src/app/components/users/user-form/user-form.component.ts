import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/shared/services/user.service";

@Component({
    selector: "app-user-form",
    templateUrl: "user-form.template.html",
})
export class UserFormComponent {

    users = this.userService.getUsers();

    formGroup!: FormGroup;

    previewSrc: string = "";

    constructor(private userService: UserService, private formBuilder: FormBuilder,
        private router: Router) {
        this.formGroup = this.formBuilder.group({
            name: ["", Validators.required],
            email: ["", [Validators.required, Validators.email]],
            profileImg: [],
        });
        this.updatePreview();
    }

    getImg(user: User) {
        return user.imgUrl ?? this.userService.defautImgUrl;
    }

    getFormControl(controlName: string): AbstractControl {
        return this.formGroup.controls[controlName];
    }

    showFormFeedback(controlName: string) {
        const control = this.getFormControl(controlName);
        return control.invalid && (control.dirty || control.touched);
    }

    getImgPreview() {
        return this.getFormControl('profileImg').value?.trim() || this.userService.defautImgUrl;
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
        this.userService.addUser(new User({
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
