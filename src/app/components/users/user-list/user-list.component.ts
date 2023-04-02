import { Component } from "@angular/core";
import { map } from "rxjs";

import { User } from "src/app/shared/models/user";
import { TaskService } from "src/app/shared/services/task.service";
import { UserService } from "src/app/shared/services/user.service";

@Component({
    selector: "app-user-list",
    templateUrl: "user-list.template.html",
})
export class UserListComponent {

    users = this.userService.getUsers();

    constructor(private userService: UserService, private taskService: TaskService) { }

    getImg(user: User) {
        return user.imgUrl ?? this.userService.defautImgUrl;
    }

    getUserTasks(user: User) {
        return this.taskService.getUserTasks(user)
            .pipe(map(tasks => tasks.filter((task) => task.completed === false)));
    }

}
