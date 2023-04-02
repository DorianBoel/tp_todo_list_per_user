interface UserDTO {
    id?: number,
    username: string,
    email: string,
    imgUrl?: string,
}

class User implements UserDTO {
    id?: number | undefined;
    username: string;
    email: string;
    imgUrl?: string | undefined;

    constructor (dto: UserDTO) {
        this.id = dto.id;
        this.username = dto.username;
        this.email = dto.email;
    }
}

export { UserDTO, User };
