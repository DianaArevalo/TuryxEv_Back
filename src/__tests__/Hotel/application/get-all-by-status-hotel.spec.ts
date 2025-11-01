import { HotelCreate, HotelGetByRol, HotelGetByStatus } from "~/lib/Hotel/application";
import { HotelStatus } from "~/lib/Hotel/domain";
import {
  CityRepository,
  HotelRepository,
} from "~/lib/Hotel/domain/repositories";
import { InMemoryCityRepository } from "~/lib/Hotel/infraestructure/repositories/InMemoryCityRepository";
import { InMemoryHotelRepository } from "~/lib/Hotel/infraestructure/repositories/InMemoryHotelRepository";

const Hotel1 = {
  name: "Hotel 1",
  email: "info@hotel1.com",
  idRole: "HOTEL",
  idPlan: "FREE",
  status: "OPEN",
  password: "$uperPassword159",
  location: "Bogotá",
  providerData: "AUTH",
};

const Hotel2 = {
  name: "Hotel 2",
  email: "info@hotel2.com",
  idRole: "STAFF",
  idPlan: "PREMIUM",
  status: "BLOCKED",
  location: "Medellín",
  providerData: "AUTHGOOGLE",
};

const Hotel3 = {
  name: "Hotel 3",
  email: "info@hotel3.com",
  idRole: "HOTEL",
  idPlan: "PREMIUM",
  status: "OPEN",
  location: "Medellín",
  providerData: "AUTHGOOGLE",
};

describe("Hotel/application/get-all-by-status", () => {
  let repository: HotelRepository;
  let locationRepository: CityRepository;
  let createHotel: HotelCreate;
  let getAllByStatus: HotelGetByStatus;

  beforeEach(async () => {
    repository = new InMemoryHotelRepository();
    locationRepository = new InMemoryCityRepository();
    createHotel = new HotelCreate(repository, locationRepository);
    getAllByStatus = new HotelGetByStatus(repository);

    await createHotel.handler(Hotel1);
    await createHotel.handler(Hotel2);
    await createHotel.handler(Hotel3);
  });

   it("should get all by status", async () => {
    const business = await getAllByStatus.handler({
      status: "OPEN",
      page: 1,
      limit: 10,
    });

    expect(business).toHaveLength(2);
  });

  



});
