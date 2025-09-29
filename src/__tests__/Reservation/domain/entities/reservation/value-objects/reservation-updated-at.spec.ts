import {
  ReservationCreatedAt,
  ReservationUpdatedAt,
} from "~/lib/Reservation/domain";

describe("Reservation/domain/value-objects/ReservationUpdatedAt", () => {
  const createdAt = ReservationCreatedAt.create(
    new Date("2025-09-20T10:00:00Z")
  );

  it("should create a valid updatedAt with now()", () => {
    const updatedAt = ReservationUpdatedAt.now(createdAt);

    expect(updatedAt).toBeInstanceOf(ReservationUpdatedAt);
    expect(updatedAt.value).toBeInstanceOf(Date);
    expect(updatedAt.value.getTime()).toBeGreaterThanOrEqual(
      createdAt.value.getTime()
    );
  });

  it("should create a valid updatedAt after createdAt", () => {
    const laterDate = new Date("2025-09-21T15:00:00Z");
    const updatedAt = ReservationUpdatedAt.create(laterDate, createdAt);

    expect(updatedAt).toBeInstanceOf(ReservationUpdatedAt);
    expect(updatedAt.value).toEqual(laterDate);
  });

  it("should allow updatedAt equal to createdAt", () => {
    const updatedAt = ReservationUpdatedAt.create(createdAt.value, createdAt);

    expect(updatedAt.value).toEqual(createdAt.value);
  });

  it("should throw if updatedAt is null or undefined", () => {
    expect(() => ReservationUpdatedAt.create(null, createdAt)).toThrow(
      "UpdatedAt no puede ser nulo"
    );
    expect(() => ReservationUpdatedAt.create(undefined, createdAt)).toThrow(
      "UpdatedAt no puede ser nulo"
    );
  });

  it("should throw if updatedAt is invalid", () => {
    expect(() =>
      ReservationUpdatedAt.create(new Date("invalid"), createdAt)
    ).toThrow("UpdatedAt inválido");
  });

  it("should throw if updatedAt is in the future", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);

    expect(() => ReservationUpdatedAt.create(futureDate, createdAt)).toThrow(
      "UpdatedAt no puede estar en el futuro"
    );
  });

  it("should throw if updatedAt is before createdAt", () => {
    const beforeCreated = new Date("2025-09-19T23:59:59Z");

    expect(() => ReservationUpdatedAt.create(beforeCreated, createdAt)).toThrow(
      "UpdatedAt no puede ser menor que CreatedAt"
    );
  });

  it("should return the primitive value", () => {
    const laterDate = new Date("2025-09-21T15:00:00Z");
    const updatedAt = ReservationUpdatedAt.create(laterDate, createdAt);

    expect(updatedAt.toPrimitives()).toEqual(laterDate);
  });
});
