import { CheckHotelFreePlans } from "~/lib/Hotel/application";
import { Hotel, HotelEmail, HotelFreePlanEnd, HotelLocation, HotelName, HotelPassword, HotelPlan, HotelRole, HotelScore, HotelStatus, ProviderData } from "~/lib/Hotel/domain";
import { InMemoryHotelRepository } from "~/lib/Hotel/infraestructure/repositories/InMemoryHotelRepository";


describe("CheckHotelFreePlans (with InMemoryHotelRepository)", () => {
  let repository: InMemoryHotelRepository;
  let useCase: CheckHotelFreePlans;

  beforeEach(() => {
    repository = new InMemoryHotelRepository();
    useCase = new CheckHotelFreePlans(repository);
  });

  it("should block hotels whose FREE plan has expired", async () => {
    // Arrange
    const now = new Date("2025-11-01");

    // hotel FREE con plan vencido (15 días después de su creación)
    const expiredHotel = new Hotel({
      name: HotelName.create("Hotel Expired"),
      email: HotelEmail.create("expired@example.com"),
      password: HotelPassword.create("$ecretPassword456"),
      location: HotelLocation.create("Bogotá"),
      plan: HotelPlan.create("FREE"),
      role: HotelRole.create("STAFF"),
      score: HotelScore.create(5),
      status: HotelStatus.create("OPEN"),
      createdAt: { value: new Date("2025-10-01") } as any,
      updatedAt: { value: new Date("2025-10-01") } as any,
      freePlanEnd: HotelFreePlanEnd.create(new Date("2025-10-01")), // expira 2025-10-16
      providerData: ProviderData.create("AUTH")
    });

    // hotel FREE aún vigente
    const activeHotel = new Hotel({
      name: HotelName.create("Hotel Active"),
      email: HotelEmail.create("active@example.com"),
      password: HotelPassword.create("$ecretPassword789"),
      location: HotelLocation.create("Medellín"),
      plan: HotelPlan.create("FREE"),
      role: HotelRole.create("HOTEL"),
      score: HotelScore.create(4),
      status: HotelStatus.create("CLOSED"),
      createdAt: { value: new Date("2025-10-20") } as any,
      updatedAt: { value: new Date("2025-10-20") } as any,
      freePlanEnd: HotelFreePlanEnd.create(new Date("2025-10-20")), // expira 2025-11-04
      providerData: ProviderData.create("AUTHGOOGLE")
    });

    await repository.create(expiredHotel);
    await repository.create(activeHotel);

    // Act
    await useCase.handler({ currentDate: now });

    // Assert
    const allHotels = await repository.getAll({ value: 1 } as any, { value: 10 } as any);
    const expired = allHotels.find(h => h.email.value === "expired@example.com");
    const active = allHotels.find(h => h.email.value === "active@example.com");

    expect(expired?.status.getValue()).toBe("BLOCKED");
    expect(active?.status.getValue()).toBe("CLOSED");
  });

  it("should not modify hotels with paid plans", async () => {
    const now = new Date("2025-11-01");

    const paidHotel = new Hotel({
      name: HotelName.create("Hotel Premium"),
      email: HotelEmail.create("premium@example.com"),
      password: HotelPassword.create("$ecretPassword123"),
      location: HotelLocation.create("Cali"),
      plan: HotelPlan.create("PREMIUM"),
      role: HotelRole.create("HOTEL"),
      score: HotelScore.create(5),
      status: HotelStatus.create("OPEN"),
      createdAt: { value: new Date("2025-09-01") } as any,
      updatedAt: { value: new Date("2025-09-01") } as any,
      providerData: ProviderData.create("AUTHFACEBOOK")
    });

    await repository.create(paidHotel);

    await useCase.handler({ currentDate: now });

    const allHotels = await repository.getAll({ value: 1 } as any, { value: 10 } as any);
    const premium = allHotels.find(h => h.email.value === "premium@example.com");

    expect(premium?.status.getValue()).toBe("OPEN");
  });
});
