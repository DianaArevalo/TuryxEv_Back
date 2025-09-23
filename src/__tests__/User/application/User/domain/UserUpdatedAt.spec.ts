import { UserUpdatedAt } from "~/lib/User/domain/UserUpdatedAt";

describe("domain/UserUpdatedAt", () => {
  it("should accept a valid past date", () => {
    const past = new Date(Date.now() - 1000); // 1s en el pasado
    const updatedAt = new UserUpdatedAt(past);

    expect(updatedAt.value).toEqual(past);
  });

  it("should accept the current date", () => {
    const now = new Date();
    const updatedAt = new UserUpdatedAt(now);

    expect(updatedAt.value).toEqual(now);
  });

  it("should throw an error if the date is in the future", () => {
    const future = new Date(Date.now() + 1000); // 1s en el futuro

    expect(() => new UserUpdatedAt(future)).toThrow(
      "Updated: La fecha de creacion debe estar en pasado"
    );
  });
});
