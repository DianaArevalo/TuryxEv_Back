jest.mock("nanoid", () => ({
      nanoid: () => "fixed-nanoid-123",
    }));

import { Hasher } from "~/lib/Shared/Infraestructure/Hasher";
import { SignTokenHandler } from "./sign-token-handler";
import { RefreshTokenRepositoryInMemory } from "~/lib/JWT/infraestructure/repositories/refresh-token-repository-in-memory";
import { JwtServiceInMemory } from "../../adapters/jwt-service-in-memory";
import { HttpError } from "~/lib/Shared/domain";

describe("SignTokenHandler - Use Case", () => {
  let handler: SignTokenHandler;
  let jwtService: JwtServiceInMemory;
  let repository: RefreshTokenRepositoryInMemory;

  beforeEach(() => {
    jwtService = new JwtServiceInMemory();
    repository = new RefreshTokenRepositoryInMemory();
    handler = new SignTokenHandler(jwtService as any, repository as any);
    

    // Hasher real está bien porque solo lo llamas una vez
    // pero si quieres velocidad:
    jest.spyOn(Hasher, "hash").mockResolvedValue("hashed-refresh-mock");
  });

  it("should sign token and save refresh token", async () => {
    const result = await handler.handler("123", { role: "USER" });

    expect(result).not.toBeNull();
    const storedTokens = repository.getAll();

    expect(storedTokens.length).toBe(1);
    expect(storedTokens[0].userId).toBe("123");
    expect(storedTokens[0].tokenHash).toBe("hashed-refresh-mock");
  });

  it("should throw if userId is missing", async () => {
    await expect(handler.handler("", {})).rejects.toThrow(HttpError);
  });
});
