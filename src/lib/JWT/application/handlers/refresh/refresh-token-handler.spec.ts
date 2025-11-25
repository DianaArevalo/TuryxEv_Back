jest.mock("nanoid", () => ({
      nanoid: () => "fixed-nanoid-123",
    }));

import { RefreshTokenRepositoryInMemory } from "~/lib/JWT/infraestructure/repositories/refresh-token-repository-in-memory";
import { JwtServiceInMemory } from "../../adapters/jwt-service-in-memory";
import { RefreshTokenHandler } from "./refresh-token-handler";
import { Hasher } from "~/lib/Shared/Infraestructure/Hasher";
import { HttpError } from "~/lib/Shared/domain";

describe("RefreshTokenHandler - Use Case", () => {
  let handler: RefreshTokenHandler;
  let jwtService: JwtServiceInMemory;
  let repository: RefreshTokenRepositoryInMemory;

  beforeEach(() => {
    jwtService = new JwtServiceInMemory();
    repository = new RefreshTokenRepositoryInMemory();
    handler = new RefreshTokenHandler(jwtService as any, repository as any);

    // Mock del hasher para velocidad
    jest.spyOn(Hasher, "verify").mockResolvedValue(true);
    jest.spyOn(Hasher, "hash").mockResolvedValue("hashed-refresh-mock");
  });

  it("should refresh token and save new refresh token", async () => {
    // Primero firmamos un token inicial para simular existencia
    const initialJwt = await jwtService.signToken({ sub: "user123", tid: "old-token-id" });
    const oldRefreshToken = initialJwt.toPrimitives().refreshToken;

    repository.saveRefreshToken("old-token-id", "old-token-id", "old-hash", new Date(Date.now() + 1000 * 60 * 60));

    const result = await handler.handler(oldRefreshToken, "user123", { role: "USER" });

    expect(result).not.toBeNull();
    const storedTokens = repository.getAll();
    expect(storedTokens.length).toBe(2); // antiguo + nuevo
    expect(storedTokens[1].tokenHash).toBe("hashed-refresh-mock");
    expect(storedTokens[1].userId).toBe("user123");
  });

  it("should throw if old refresh token is missing", async () => {
    await expect(handler.handler("", "user123", {})).rejects.toThrow(HttpError);
  });
});