import { HotelCreate, HotelEdit } from "~/lib/Hotel/application";
import { CityRepository, HotelRepository, ProviderData, ProviderDataT } from "~/lib/Hotel/domain";
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
  providerData: "AUTH" as ProviderDataT,
};

const Hotel2 = {
  name: "Hotel 2",
  email: "info@hotel2.com",
  idRole: "HOTEL",
  idPlan: "FREE",
  status: "OPEN",
  location: "Bogotá",
  providerData: "AUTHGOOGLE",
};

describe("Hotel/application/edit-hotel", () => {
  let repository: HotelRepository;
  let locationRepository: CityRepository;
  let createHotel: HotelCreate;
  let editHotel: HotelEdit;
  let hotelId: string;

  beforeEach(async () => {
    repository = new InMemoryHotelRepository();
    locationRepository = new InMemoryCityRepository();
    createHotel = new HotelCreate(repository, locationRepository);
    editHotel = new HotelEdit(repository, locationRepository);

    const createdHotel = await createHotel.handler(Hotel1);
    hotelId = createdHotel.hotelId as string;
  });

  it("should edit a hotel", async () => {
    const edit = {
      hotelId,
      name: "Hotel 2",
      password: "$uperPassword555",
      location: "Medellín",
      plan: "BASIC",
      score: "5",
      picture: "https://worldvectorlogo.com/es/logo/expressjs",
      status: "CLOSED",
    };

    const edited = await editHotel.handler(edit);

    expect(edited.name).toBe("Hotel 2");
    expect(edited.location).toBe("Medellín");
    expect(edited.plan).toBe("BASIC");
    expect(edited.score).toBe(5);
    expect(edited.picture).toBe("https://worldvectorlogo.com/es/logo/expressjs");
  });

  it("should throw an error when location not exists", async () => {
    const edit = {
      hotelId,
      location: "Any location",
    };

    await expect(editHotel.handler(edit)).rejects.toBeInstanceOf(HttpError);
  });

  it("should throw an error when hotelId not found", async () => {
    const edit = {
      hotelId: "id-not-found",
      name: "Hotel 2",
    };

    await expect(editHotel.handler(edit)).rejects.toBeInstanceOf(HttpError);
  });

   it("should throw an error when password is provided and provider isn't 'AUTH'", async () => {
    const created = await createHotel.handler(Hotel2);
    const edit = {
      hotelId: created.hotelId as string,
      password: "$uperPassword555",
    };

    await expect(editHotel.handler(edit)).rejects.toBeInstanceOf(HttpError);
  });
});
