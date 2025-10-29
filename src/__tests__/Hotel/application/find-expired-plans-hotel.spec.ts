
import { InMemoryHotelRepository } from "~/lib/Hotel/infraestructure/repositories/InMemoryHotelRepository";
import { InMemoryCityRepository } from "~/lib/Hotel/infraestructure/repositories/InMemoryCityRepository";
import { HotelRepository, CityRepository } from "~/lib/Hotel/domain";
import { FindExpiredPlans, HotelCreate } from "~/lib/Hotel/application";

const HotelFree = {
  name: "Free Hotel",
  email: "free@hotel.com",
  idRole: "HOTEL",
  idPlan: "FREE",
  status: "OPEN",
  password: "$uperPassword159",
  location: "Bogotá",
  providerData: "AUTH",
};

const HotelPremium = {
  name: "Premium Hotel",
  email: "premium@hotel.com",
  idRole: "HOTEL",
  idPlan: "PREMIUM",
  status: "OPEN",
  password: "$uperPassword159",
  location: "Medellín",
  providerData: "AUTHGOOGLE",
};

describe("Hotel/application/find-expired-plans", () => {
  let repository: HotelRepository;
  let locationRepository: CityRepository;
  let createHotel: HotelCreate;
  let findExpiredPlans: FindExpiredPlans;
  let freeHotelId: string;
  let premiumHotelId: string;

  beforeEach(async () => {
    repository = new InMemoryHotelRepository();
    locationRepository = new InMemoryCityRepository();
    createHotel = new HotelCreate(repository, locationRepository);
    findExpiredPlans = new FindExpiredPlans(repository);

    const createdFree = await createHotel.handler(HotelFree);
    const createdPremium = await createHotel.handler(HotelPremium);

    // 👇 Ajuste para tu estructura DDD (usa hotelId devuelto)
    freeHotelId = createdFree.hotelId as string;
    premiumHotelId = createdPremium.hotelId as string;
  });

  it("should find expired free plan hotels and block them", async () => {
    const now = new Date();

    const result = await findExpiredPlans.handler({ now, id: freeHotelId });

    // ✅ Retorna el hotel FREE vencido
    expect(result.length).toBe(1);

    // 👇 accede correctamente al value object (id y status)
    const hotel = result[0];
    expect(hotel.status.getValue()).toBe("BLOCKED");

    // 🧩 Verifica que se haya guardado el cambio en el repo
   const updatedHotel = await repository.getOneById(hotel.hotelId!);
expect(updatedHotel?.status.getValue()).toBe("BLOCKED");


  });

  it("should not block premium hotels", async () => {
    const now = new Date();
    const result = await findExpiredPlans.handler({ now, id: premiumHotelId });

    expect(result.length).toBe(0);
  });
});
