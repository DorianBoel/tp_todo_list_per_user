interface TaskCategoryDTO {
    id?: number;
    label: string;
}

class TaskCategory implements TaskCategoryDTO {
    id?: number | undefined;
    label: string;

    constructor(dto: TaskCategoryDTO) {
        this.id = dto.id;
        this.label = dto.label;
    }
}

export { TaskCategoryDTO, TaskCategory };
