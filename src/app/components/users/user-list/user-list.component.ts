import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/shared/services/user.service";

@Component({
    selector: "app-user-list",
    templateUrl: "user-list.template.html",
})
export class UserListComponent implements OnDestroy {

    private subscription: Subscription;

    users: User[] = [];

    constructor(private userService: UserService) {
        this.subscription = this.userService.getSubscription((users) => this.users = users);
    }

    getImg(user: User) {
        return user.imgUrl ?? this.userService.defautImgUrl;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    };

}
