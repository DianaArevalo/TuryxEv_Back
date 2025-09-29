export class HotelNotFoundError extends Error {
    readonly statusCode: number;

    constructor(message: "Hotel not found") {
        super(message);
        this.name = "HotelNotFoundError";
        this.statusCode = 404;


        //
        Object.setPrototypeOf(this, HotelNotFoundError.prototype);
    }
}