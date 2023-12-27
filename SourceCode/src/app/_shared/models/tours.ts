import { disableCursor } from '@fullcalendar/core/internal';

export class ToursDto {
    constructor(
        customerId: string,
        destinationId: string,
        packageId: string,
        guideId: string,
        price: Number,
        discount: Number,
        startDate: Date,
        description: string,
        id: string = null
    ) {
        if (id) {
            this.Id = id;
        }
        this.CustomerId = customerId;
        this.DestinationId = destinationId;
        this.PackageId = packageId;
        this.GuideId = guideId;
        this.Price = price;
        this.Discount = discount;
        this.StartDate = startDate;
        this.Description = description;
    }
    Id: string;
    CustomerId: string;
    DestinationId: string;
    PackageId: string;
    GuideId: string;
    Price: Number;
    Discount: Number;
    StartDate: Date;
    Description: string;
}
