import { ImageDto } from './Image';

export interface CreateDestinationDto {
    Code: string;
    Name: string;
    Description: string;
    Rating: number;
}
export interface UpdateDestinationDto {
    Id: string;
    Code: string;
    Name: string;
    Description: string;
    Rating: number;
    Images: string;
}

export class DestinationDto {
    constructor(
        code: string,
        name: string,
        description: string,
        rating: number,
        images: string,
        id: string = ''
    ) {
        this.Code = code;
        this.Name = name;
        this.Description = description;
        this.Rating = rating;
        if (id) this.Id = id ? id : null;
        if (images) {
            this.Images = JSON.parse(images) as ImageDto[];
        }
    }
    Id?: string;
    Code: string;
    Name: string;
    Description: string;
    Images: ImageDto[];
    Rating: number;
}
