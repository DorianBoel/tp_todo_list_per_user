import { Component } from "@angular/core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faAngleRight, faList, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
})
export class AppComponent {
    title = "todo_list_per_user";

    constructor(private iconLibrary: FaIconLibrary) {
        iconLibrary.addIcons(
            faAngleRight,
            faList,
            faPenToSquare,
            faTrash,
        );
    }
}
