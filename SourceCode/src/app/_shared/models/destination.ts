export class DestinationDto {
    constructor(
        name: string,
        description: string,
        images: string[],
        rating: number,
        id: string = ''
    ) {
        this.Name = name;
        this.Description = description;
        this.Images = images;
        this.Rating = rating;
        if (id) this.Id = id;
    }
    Id?: string;
    Name: string;
    Description: string;
    Images: string[];
    Rating: number;
}
