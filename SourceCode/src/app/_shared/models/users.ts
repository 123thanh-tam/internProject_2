export class UsersDto {
    constructor(
        id: string,
        name: string,
        kind: string,
        email: string,
        phone: string
    ) {
        if (id) {
            this.Id = id;
        }
        this.Name = name;
        this.Kind = kind;
        this.Email = email;
        this.Phone = phone;
    }
    Id: string;
    Name: string;
    Kind: string;
    Email: string;
    Phone: string;
}
