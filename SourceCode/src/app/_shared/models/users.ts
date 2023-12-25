export class UsersDto {
    constructor(
        id: string,
        name: string,
        kind: string,
        email: string,
        phone: string
    ) {
        this.UsersId = id;
        this.Name = name;
        this.Kind = kind;
        this.Email = email;
        this.Phone = phone;
    }
    UsersId: string;
    Name: string;
    Kind: string;
    Email: string;
    Phone: string;
}
