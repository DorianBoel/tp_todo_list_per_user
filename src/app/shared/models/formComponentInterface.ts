import { AbstractControl, FormGroup } from "@angular/forms";

export interface FormComponentInterface {
    formGroup: FormGroup;
    getFormControl(name: string): AbstractControl;
    showFormFeedback(name: string): boolean;
    submitForm(): void;
}
