export class PackagesDto {
    constructor(
        code: string,
        name: string,
        desId: string,
        sDate: Date,
        dateCount: number,
        people: Number,
        price: Number,
        discount: number,
        id: string = ''
    ) {
        if (id) {
            this.Id = id;
        }
        this.Code = code;
        this.Name = name;
        this.DestinationId = desId;
        this.StartDate = sDate;
        this.DateCount = dateCount;
        this.People = people;
        this.Price = price;
        this.Discount = discount;
    }
    Id: string;
    Code: string;
    Name: string;
    DestinationId: string;
    StartDate: Date;
    DateCount: number;
    People: Number;
    Price: Number;
    Discount: number;
}
