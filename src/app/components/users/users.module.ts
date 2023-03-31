import { NgModule } from "@angular/core";
import { UserListComponent } from "./user-list/user-list.component";
import { CommonModule } from "@angular/common";
import { UsersRoutingModule } from "./users-routing.module";
import { UserViewComponent } from "./user-view/user-view.component";

@NgModule({
    declarations: [
        UserListComponent,
        UserViewComponent,
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
    ]
})
export class UsersModule { }
