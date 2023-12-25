import { ImageDto } from "./image";

export class DestinationDto {
    constructor(
        name: string,
        description: string,
        rating: number,
        images: ImageDto[] = null,
        id: string = ''
    ) {
        this.Name = name;
        this.Description = description;
        this.Rating = rating;
        if (id) this.Id = id ? id : null;
        if (images && images.length) {
            this.Images = [...images];
        } else {
            this.Images = null;
        }
    }
    Id?: string;
    Name: string;
    Description: string;
    Images: ImageDto[];
    Rating: number;
}
