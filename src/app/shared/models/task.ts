interface TaskDTO {
    id?: number,
    name: string;
    completed: boolean;
    categoryId: number;
    userId?: number;
}

class Task implements TaskDTO {
    id?: number | undefined;
    name: string;
    completed: boolean;
    categoryId: number;
    userId?: number | undefined;

    constructor(dto: TaskDTO) {
        this.id = dto.id;
        this.name = dto.name;
        this.completed = dto.completed;
        this.categoryId = dto.categoryId;
        this.userId = dto.userId;
    }
}

export { TaskDTO, Task };
