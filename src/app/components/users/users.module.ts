import { NgModule } from "@angular/core";
import { UserListComponent } from "./user-list/user-list.component";
import { CommonModule } from "@angular/common";
import { UsersRoutingModule } from "./users-routing.module";

@NgModule({
    declarations: [
        UserListComponent,
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
    ],
    exports: [
        UserListComponent,
    ]
})
export class UsersModule { }
