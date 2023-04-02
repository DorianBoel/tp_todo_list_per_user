import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { UsersRoutingModule } from "./users-routing.module";
import { UserListComponent } from "./user-list/user-list.component";
import { UserViewComponent } from "./user-view/user-view.component";
import { UserFormComponent } from "./user-form/user-form.component";

@NgModule({
    declarations: [
        UserListComponent,
        UserViewComponent,
        UserFormComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule,
        FontAwesomeModule,
    ]
})
export class UsersModule { }
