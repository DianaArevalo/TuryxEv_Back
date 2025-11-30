import { RefreshTokenRepositoryInMemory } from "~/lib/JWT/infraestructure/repositories/refresh-token-repository-in-memory";
import { JwtServiceInMemory } from "../../adapters/jwt-service-in-memory";
import { RevokeTokenHandler } from "./revoke-token-handler";
import { HttpError } from "~/lib/Shared/domain";

describe("RevokeTokenHandler - Use Case", () => {
  let handler: RevokeTokenHandler;
  let jwtService: JwtServiceInMemory;
  let repository: RefreshTokenRepositoryInMemory;  

  beforeEach(() => {
    jwtService = new JwtServiceInMemory();
    repository = new RefreshTokenRepositoryInMemory();
    handler = new RevokeTokenHandler(jwtService as any, repository as any);
  });

  it("should revoke a valid token", async () => {
    // Creamos un token simulado
    const jwt = await jwtService.signToken({ sub: "user123", tid: "token123" });
    const refreshToken = jwt.toPrimitives().refreshToken;

    //UTC
    const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

    // Guardamos en el repositorio
    await repository.saveRefreshToken(
      "user123",
      "token123",
      "hash",
      new Date(Date.now() + REFRESH_TOKEN_TTL_MS)
    );

    // Ejecutamos handler
    await handler.handler(refreshToken, "user123");

    // Verificamos que el token está revocado
    const stored = await repository.findRefreshTokenById("token123");
    expect(stored?.revoked).toBe(true);
  });

  it("should throw if token is missing", async () => {
    await expect(handler.handler("", "user123")).rejects.toThrow(HttpError);
  });

  it("should throw if token does not belong to user", async () => {
    const jwt = await jwtService.signToken({ sub: "user123", tid: "token123" });
    const refreshToken = jwt.toPrimitives().refreshToken;

    await repository.saveRefreshToken(
      "user123",
      "token123",
      "hash",
      new Date(Date.now() + 1000 * 60 * 60)
    );

    await expect(handler.handler(refreshToken, "anotherUser")).rejects.toThrow(
      HttpError
    );
  });

  it("should throw if token not found in repository", async () => {
    const jwt = await jwtService.signToken({ sub: "user123", tid: "token123" });
    const refreshToken = jwt.toPrimitives().refreshToken;

    // No lo guardamos en repositorio
    await expect(handler.handler(refreshToken, "user123")).rejects.toThrow(
      HttpError
    );
  });

  it("should throw if userId is empty", async () => {
  const jwt = await jwtService.signToken({ sub: "user123", tid: "token123" });
  const refreshToken = jwt.toPrimitives().refreshToken;

  await expect(handler.handler(refreshToken, ""))
    .rejects
    .toThrow("User ID is required");
});

});