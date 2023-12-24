export class DestinationDto {
    constructor(
        name: string,
        description: string,
        images: string[],
        rating: number,
        discount: number,
        id: string = ''
    ) {
        this.Name = name;
        this.Description = description;
        this.Images = images;
        this.Rating = rating;
        this.Discount = discount;
        if (id) this.Id = id;
    }
    Id?: string;
    Name: string;
    Description: string;
    Images: string[];
    Rating: number;
    Discount: number;
}
