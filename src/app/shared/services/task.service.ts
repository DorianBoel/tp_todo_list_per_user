import { Injectable } from "@angular/core";
import { environment } from "src/app/env";
import { Task } from "../models/task";
import { TaskCategory } from "../models/taskCategory";
import { BehaviorSubject, filter, from, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";

@Injectable({
    providedIn: "root",
})
export class TaskService {

    private baseUrl = {
        tasks: `${environment.API_URL}/tasks`,
        taskCategories: `${environment.API_URL}/taskCategories`,
    }

    private tasks$ = new BehaviorSubject<Task[]>([]);
    private taskCategories$ = new BehaviorSubject<TaskCategory[]>([]);

    constructor(private http: HttpClient) {
        this.fetchTasks();
        this.fetchTaskCategories();
    }

    private fetchTasks() {
        this.http
            .get<Task[]>(this.baseUrl.tasks)
            .subscribe((data) => this.tasks$.next(data));
    }

    private fetchTaskCategories() {
        this.http
            .get<TaskCategory[]>(this.baseUrl.taskCategories)
            .subscribe((data) => this.taskCategories$.next(data));
    }

    findTaskCategoryById(id: number) {
        return this.taskCategories$
            .pipe(
                map((categories) => categories.find((category) => category.id === id)),
            );
    }

    getUserTasks(user: User) {
        return this.tasks$.pipe(
            map(tasks => tasks.filter((task) => task.userId === user.id))
        );
    }

}
