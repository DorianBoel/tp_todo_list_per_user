import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { TasksRoutingModule } from "./tasks-routing.module";
import { TaskFormComponent } from "./task-form/task-form.component";

@NgModule({
    declarations: [
        TaskFormComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TasksRoutingModule,
    ]
})
export class TasksModule { }
