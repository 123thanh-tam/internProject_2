export class ImageDto {
    constructor(
        _url: string,
        _path: string,
        _name: string,
        _size: number
    ) {
        this.Url = _url;
        this.Path = _path;
        this.Name = _name;
        this.Size = _size;
    }
    Url: string;
    Path: string;
    Name: string;
    Size: number;
}
