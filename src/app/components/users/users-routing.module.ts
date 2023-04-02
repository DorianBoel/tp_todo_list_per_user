import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserListComponent } from "./user-list/user-list.component";
import { UserViewComponent } from "./user-view/user-view.component";
import { UserFormComponent } from "./user-form/user-form.component";

const routes: Routes = [
    {
        path: "",
        component: UserListComponent,
    },
    {
        path: "view/:id",
        component: UserViewComponent,
    },
    {
        path: "add",
        component: UserFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsersRoutingModule { }
