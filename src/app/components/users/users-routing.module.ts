import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserListComponent } from "./user-list/user-list.component";

const routes: Routes = [
    {
        path: "",
        component: UserListComponent,
    },
    {
        path: "view/:id",
        component: UserListComponent,
    },
    {
        path: "add",
        component: UserListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsersRoutingModule { }
