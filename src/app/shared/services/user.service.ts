import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";

import { environment } from "../../env";
import { User } from "../models/user";

@Injectable({
    providedIn: "root",
})
export class UserService {

    private baseUrl = `${environment.API_URL}/users`;

    public users$ = new BehaviorSubject<User[]>([]);

    public readonly defautImgUrl = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

    constructor(private http: HttpClient) {
        this.fetchUsers();
    }

    private fetchUsers() {
        this.http
            .get<User[]>(this.baseUrl)
            .subscribe((data) => this.users$.next(data));
    }

    getUsers() {
        return this.users$.asObservable();
    }

    findById(id: number) {
        return this.http
            .get<User>(`${this.baseUrl}/${id}`);
    }

    addUser(user: User) {
        return this.http
            .post<User>(this.baseUrl, user)
            .pipe(
                tap(() => this.fetchUsers()),
            );
    }

    updateUser(user: User) {
        return this.http
            .put<User>(`${this.baseUrl}/${user.id}`, user)
            .pipe(
                tap(() => this.fetchUsers()),
            );
    }

}
