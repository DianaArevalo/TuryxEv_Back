import { ReservationCreatedAt } from "~/lib/Reservation/domain";

describe("Reservation/domain/value-objects/ReservationCreatedAt", () => {
  it("should create a new ReservationCreatedAt with now()", () => {
    const createdAt = ReservationCreatedAt.now();

    expect(createdAt).toBeInstanceOf(ReservationCreatedAt);
    expect(createdAt.value).toBeInstanceOf(Date);
  });

  it("should create a ReservationCreatedAt from a valid past date", () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    const createdAt = ReservationCreatedAt.create(pastDate);

    expect(createdAt).toBeInstanceOf(ReservationCreatedAt);
    expect(createdAt.value).toEqual(pastDate);
  });

  it("should throw if value is null or undefined", () => {
    expect(() => ReservationCreatedAt.create(null)).toThrow(
      "CreatedAt no puede ser nulo"
    );
    expect(() => ReservationCreatedAt.create(undefined)).toThrow(
      "CreatedAt no puede ser nulo"
    );
  });

  it("should throw if value is invalid", () => {
    expect(() => ReservationCreatedAt.create(new Date("invalid"))).toThrow(
      "CreatedAt inválido"
    );
  });

  it("should throw if value is in the future", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);

    expect(() => ReservationCreatedAt.create(futureDate)).toThrow(
      "CreatedAt no puede estar en el futuro"
    );
  });
});
