

export interface CityRepository {
    getValidCities(): Promise<string[]>
    isValidCity(city: string): Promise<boolean>
}