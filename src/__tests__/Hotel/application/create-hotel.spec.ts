import { HotelCreate } from "~/lib/Hotel/application";
import { CityRepository, HotelLocation, HotelRepository } from "~/lib/Hotel/domain";
import { InMemoryCityRepository } from "~/lib/Hotel/infraestructure/repositories/InMemoryCityRepository";
import { InMemoryHotelRepository } from "~/lib/Hotel/infraestructure/repositories/InMemoryHotelRepository";
import { HttpError, Limit, Page, ValidationError } from "~/lib/Shared/domain";

describe("Hotel/application/create-hotel", () => {
  let repository: HotelRepository;
  let locationRepository: CityRepository;
  let createHotel: HotelCreate;

  beforeEach(() => {
    repository = new InMemoryHotelRepository();
    locationRepository = new InMemoryCityRepository();
    createHotel = new HotelCreate(repository, locationRepository);
  });

  it("should create a business and persist it", async () => {
    const props = {
      name: "HOTELLASMARGARITAS",
      email: "info@lasmargaritas.com",
      idRole: "HOTEL",
      idPlan: "FREE",
      status: "OPEN",
      password: "$uperPassword159",
      location: "Bogotá",
      providerData: "AUTH",
    };

    await createHotel.handler(props);

    const hotels = await repository.getAll(new Page(1), new Limit(10));

    expect(hotels).toHaveLength(1);
  });

  it("should create a business when password is not provided", async () => {
    const props = {
      name: "Hotel 1",
      email: "info@hotel1.com",
      idRole: "HOTEL",
      idPlan: "FREE",
      status: "OPEN",
      location: "Bogotá",
      providerData: "AUTHGOOGLE",
    };

    await createHotel.handler(props);

    const hotels = await repository.getAll(new Page(1), new Limit(10));

    expect(hotels).toHaveLength(1);
  });


  it("should create a business when picture is provided", async () => {
     const props = {
      name: "Hotel 1",
      email: "info@hotel1.com",
      idRole: "HOTEL",
      idPlan: "FREE",
      status: "OPEN",
      password: "$uperPassword159",
      location: "Bogotá",
      picture: "https://worldvectorlogo.com/es/logo/expressjs",
      providerData: "AUTH",
    };

    await createHotel.handler(props);

    const hotels = await repository.getAll(new Page(1), new Limit(10));

    expect(hotels).toHaveLength(1);

  });

  it("should throw an error when a password is not provided and providerData is from 'AUTH'", async () => {
      const props = {
      name: "Hotel 1",
      email: "info@hotel1.com",
      idRole: "HOTEL",
      idPlan: "FREE",
      status: "OPEN",      
      location: "Bogotá",
      providerData: "AUTH",
    };

   await expect(createHotel.handler(props)).rejects.toBeInstanceOf(
    HttpError
   )
  });


  it("should throw an error when location is invalid", async () => {
       const props = {
      name: "Hotel 1",
      email: "info@hotel1.com",
      idRole: "HOTEL",
      idPlan: "FREE",
      status: "OPEN",    
      password: "$uperPassword159",
      location: "Any location",
      providerData: "AUTH",
    };


    expect(() => HotelLocation.create("")).toThrow(ValidationError);
    
  })
});
