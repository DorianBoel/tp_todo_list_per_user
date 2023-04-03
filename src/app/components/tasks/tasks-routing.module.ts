import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TaskFormComponent } from "./task-form/task-form.component";

const routes: Routes = [
    {
        path: "add",
        component: TaskFormComponent,
    },
    {
        path: "edit/:id",
        component: TaskFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TasksRoutingModule { }
