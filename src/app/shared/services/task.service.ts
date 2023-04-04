import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, tap } from "rxjs";

import { environment } from "src/app/env";
import { Task } from "../models/task";
import { TaskCategory } from "../models/taskCategory";
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

    getTaskCategories() {
        return this.taskCategories$.asObservable();
    }

    findById(id: number) {
        return this.http
            .get<Task>(`${this.baseUrl.tasks}/${id}`);
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

    addTask(task: Task) {
        return this.http
            .post<Task>(this.baseUrl.tasks, task)
            .pipe(
                tap(() => this.fetchTasks()),
            );
    }

    updateTask(task: Task) {
        return this.http
            .put<Task>(`${this.baseUrl.tasks}/${task.id}`, task)
            .pipe(
                tap(() => this.fetchTasks()),
            );
    }

    deleteTask(id: number) {
        return this.http
            .delete<Task>(`${this.baseUrl.tasks}/${id}`)
            .pipe(
                tap(() => this.fetchTasks()),
            );
    }

}
