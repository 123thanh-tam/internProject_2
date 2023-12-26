import { disableCursor } from '@fullcalendar/core/internal';

export class ToursDto {
    constructor(
        id: string,
        code: string,
        customerId: string,
        packageId: string,
        guideId: string,
        status: string,
        price: Number,
        discount: Number
    ) {
        if (id) {
            this.Id = id;
        }
        this.Code = code;
        this.CustomerId = customerId;
        this.PackageId = packageId;
        this.GuideId = guideId;
        this.Status = status;
        this.Price = price;
        this.Discount = discount;
    }
    Id: string;
    Code: string;
    PackageId: string;
    CustomerId: string;
    GuideId: string;
    Status: string;
    Price: Number;
    Discount: Number;
}
