export class Destination {
    constructor(
        name: string,
        desctiption: string,
        images: string[],
        rating: number,
        discount: number,
        id: string = ''
    ) {
        this.Name = name;
        this.Description = desctiption;
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