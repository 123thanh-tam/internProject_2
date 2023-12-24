export class PackagesDto {
    constructor(
        pacId: string,
        desId: string,
        sDate: Date,
        eDate: Date,
        people: Number,
        price: Number,
        img: string
    ) {
        (this.PackagesId = pacId), (this.DestinationId = desId);
        this.StartDate = sDate;
        this.EndDate = eDate;
        this.People = people;
        this.Price = price;
        this.Images = img;
    }
    PackagesId: string;
    DestinationId: string;
    StartDate: Date;
    EndDate: Date;
    People: Number;
    Price: Number;
    Images: string;
}
