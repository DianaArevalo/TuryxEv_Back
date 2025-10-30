import { CityRepository, Hotel, HotelLocation } from "../../domain";

export class MongoLocationRepository implements CityRepository {
    getValidCities(): Promise<HotelLocation[]> {
         throw new Error("Method not implemented.");
    }

    isValidCity(city: HotelLocation): Promise<boolean> {
         throw new Error("Method not implemented.");
    }

    getHotelsByCity(): Promise<Hotel[]> {
         throw new Error("Method not implemented.");
    }

    createCity(city: string): HotelLocation{
         throw new Error("Method not implemented.");
    }
}