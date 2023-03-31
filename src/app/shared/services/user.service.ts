import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../env";
import { User } from "../models/user";

@Injectable({
    providedIn: "root",
})
export class UserService {

    private baseUrl = `${environment.API_URL}/users`;

    private users$ = new BehaviorSubject<User[]>([]);

    public readonly defautImgUrl = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

    constructor(private http: HttpClient) {
        this.fetchTasks();
    }

    private fetchTasks() {
        this.http
            .get<User[]>(this.baseUrl)
            .subscribe((data) => this.users$.next(data));
    }

    getSubscription(callback: (value: User[]) => void) {
        return this.users$.subscribe(callback);
    }

}
