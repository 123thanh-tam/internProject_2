export class Destination {
    constructor(
        name: string,
        desctiption: string,
        image: string[],
        rating: number,
        discount: number) {
        this.Name = name;
        this.Description = desctiption;
        this.Images = image;
        this.Rating = rating;
        this.Discount = discount;

    }
    Id: string;
    Name: string;
    Description: string;
    Images: string[];
    Rating: number;
    Discount: number;
}