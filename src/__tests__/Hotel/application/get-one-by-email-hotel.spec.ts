import { HotelCreate, HotelGetOnByEmail } from "~/lib/Hotel/application";
import { CityRepository, HotelRepository } from "~/lib/Hotel/domain";
import { InMemoryCityRepository } from "~/lib/Hotel/infraestructure/repositories/InMemoryCityRepository";
import { InMemoryHotelRepository } from "~/lib/Hotel/infraestructure/repositories/InMemoryHotelRepository";
import { HttpError } from "~/lib/Shared/domain/exeptions";

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
  idRole: "HOTEL",
  idPlan: "FREE",
  status: "OPEN",
  location: "Medellín",
  providerData: "AUTHGOOGLE",
};

describe("Hotel/application/get-one-by-email-hotel", () => {
  let repository: HotelRepository;
  let locationRepository: CityRepository;
  let createHotel: HotelCreate;
  let getOneByEmail: HotelGetOnByEmail;

  beforeEach(async () => {
    repository = new InMemoryHotelRepository();
    locationRepository = new InMemoryCityRepository();
    createHotel = new HotelCreate(repository, locationRepository);
    getOneByEmail = new HotelGetOnByEmail(repository);

    await createHotel.handler(Hotel1);
    await createHotel.handler(Hotel2);
  });


  
  it("should get one business by email", async () => {
    const hotel = await getOneByEmail.handler({
      email: "info@hotel2.com",
    });

    expect(hotel).toBeTruthy();
  });

  it("should throw error when email is not found", async () => {
    await expect(
      getOneByEmail.handler({
        email: "info@hotel3.com",
      })
    ).rejects.toBeInstanceOf(HttpError);
  });
});
