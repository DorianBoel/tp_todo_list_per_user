import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "users",
    },
    {
        path: "tasks",
        loadChildren: () =>
            import("./components/tasks/tasks.module")
                .then((mod) => mod.TasksModule),
    },
    {
        path: "users",
        loadChildren: () =>
            import("./components/users/users.module")
                .then((mod) => mod.UsersModule),
    },
    {
        path: "**",
        redirectTo: "users",
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
