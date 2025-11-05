import { UserStatus } from "~/lib/User/domain/entities/User/value-objects/UserStatus";

describe("domain/UserStatus", () => {
  it("should create a valid name", () => {
    const status = new UserStatus(true);
    expect(status.value).toBe(true);
  });
});
