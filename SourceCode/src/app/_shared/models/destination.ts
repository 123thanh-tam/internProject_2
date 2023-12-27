import { ImageDto } from './Image';

export interface CreateDestinationDto {
    Code: string;
    Name: string;
    Description: string;
    Rating: number;
    TravelGuideIdss: string[];
}
export interface UpdateDestinationDto {
    Id: string;
    Code: string;
    Name: string;
    Description: string;
    Rating: number;
    Images: string;
    TravelGuideIdss: string[];
}

export class DestinationDto {
    constructor(
        code: string,
        name: string,
        description: string,
        rating: number,
        images: string,
        travelGuideIdss: string[],
        id: string = ''
    ) {
        this.Code = code;
        this.Name = name;
        this.Description = description;
        this.Rating = rating;
        if (id) this.Id = id ? id : null;
        this.TravelGuideIdss = travelGuideIdss && travelGuideIdss.length > 0 ? travelGuideIdss : [];
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
    TravelGuideIdss: string[];
}
