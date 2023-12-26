import { eUserKind } from "../consts";
import { ImageDto } from "./Image";

export class UsersDto {
    constructor(
        userName: string,
        mame: string,
        password: string,
        kind: eUserKind,
        email: string,
        phone: string,
        avatar: string,
        id: string = null
    ) {
        if (id) {
            this.Id = id;
        }

        this.UserName = userName;
        this.Name = mame;
        this.Password = password;
        this.Kind = kind;
        this.Email = email;
        this.Phone = phone;
        if (avatar) {
            this.Avatar = JSON.parse(avatar) as ImageDto;
        }
    }
    Id?: string;
    UserName: string;
    Name: string;
    Password: string;
    Kind: eUserKind;
    Email: string;
    Phone: string;
    Avatar: ImageDto;
}
export interface CreateUsersDto {
    UserName?: string;
    Name: string;
    Password: string;
    Kind: eUserKind;
    Email: string;
    Phone: string;
}
export interface UpdateUsersDto {
    Id: string;
    Name: string;
    Password: string;
    Kind: eUserKind;
    Email: string;
    Phone: string;
    Avatar: string;
}

