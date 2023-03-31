
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import bulmaCollapsible from '@creativebulma/bulma-collapsible';
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/shared/services/user.service";

@Component({
    selector: "app-user-view",
    templateUrl: "user-view.template.html",
})
export class UserViewComponent implements OnInit {

    user: User | null = null;

    constructor(private userService: UserService, private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        bulmaCollapsible.attach(".is-collapsible");
        const id = this.route.snapshot.params["id"];
        this.userService
            .findById(id)
            .subscribe({
                next: (user) => this.user = user,
                error: (err: Error) => {
                    if (err instanceof HttpErrorResponse && err.status === 404) {
                        this.router.navigate(["/users"]);
                        return;
                    }
                    console.error(err.message);
                },
            });
    }

    getImg(user: User) {
        return user.imgUrl ?? this.userService.defautImgUrl;
    }

    toggleCollapsible(event: MouseEvent) {
        const elem = (event.target as HTMLElement);
        const header = elem.offsetParent?.querySelector(".card-header");
        header?.classList.toggle("is-active", !elem.classList.contains("is-active"));
    }

}
