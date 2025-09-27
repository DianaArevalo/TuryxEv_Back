import { CityRepository } from "../../../repositories/CityRepository";

export class HotelLocation {
    private readonly city: string;

    private constructor(city: string){
        this.city = city
    }

    static async create(city: string, cityRepository: CityRepository): Promise<HotelLocation> {
        if (!city || city.trim().length === 0) {
            throw new Error ("The city can't be empty")            
        }

        return new HotelLocation(city.trim())
    }

    //listado de ciudades en un menu desplegabe en el frontend
    
    getValue(): string {
        return this.city;
    }
     
}