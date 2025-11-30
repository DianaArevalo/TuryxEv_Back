jest.mock("nanoid", () => ({
  nanoid: () => "fixed-nanoid-123",
}));

import { RefreshTokenRepositoryInMemory } from "~/lib/JWT/infraestructure/repositories/refresh-token-repository-in-memory";
import { RefreshTokenHandler } from "./refresh-token-handler";
import { Hasher } from "~/lib/Shared/Infraestructure/Hasher";
import { HttpError } from "~/lib/Shared/domain";

// 👉 Servicio JWT mockeado
const jwtServiceMock = {
  verifyToken: jest.fn(),
  signToken: jest.fn(),
};

describe("RefreshTokenHandler - Use Case", () => {
  let handler: RefreshTokenHandler;
  let repository: RefreshTokenRepositoryInMemory;

  beforeEach(() => {
    repository = new RefreshTokenRepositoryInMemory();

    handler = new RefreshTokenHandler(jwtServiceMock as any, repository as any);

    jest.clearAllMocks();

    // mock del hasher
    jest.spyOn(Hasher, "verify").mockResolvedValue(true);
    jest.spyOn(Hasher, "hash").mockResolvedValue("hashed-refresh-mock");
  });

  it("should refresh token and save new refresh token", async () => {
    // ------------------------------------------
    // 1️⃣ Mock del verifyToken → lo que devuelve un JWT real
    // ------------------------------------------
    jwtServiceMock.verifyToken.mockResolvedValue({
      sub: "user123",
      tid: "old-token-id",
    });

    // ------------------------------------------
    // 2️⃣ Mock del signToken → crear nuevo JWT
    // ------------------------------------------
    jwtServiceMock.signToken.mockResolvedValue({
      toPrimitives: () => ({
        accessToken: "new.access.token",
        refreshToken: "refresh.user123.new-token-id",
        expiration: Date.now() + 3600_000,
      }),
    });

    // ------------------------------------------
    // 3️⃣ Pre-cargar el viejo refresh token en el repo
    // ------------------------------------------
    await repository.saveRefreshToken(
      "user123",
      "old-token-id",
      "old-hash",
      new Date(Date.now() + 1000 * 60 * 60)
    );

    // ------------------------------------------
    // 4️⃣ Ejecutamos handler
    // ------------------------------------------
    const result = await handler.handler(
      "refresh.user123.old-token-id",
      "user123",
      { role: "USER" }
    );

    expect(result).not.toBeNull();

    const stored = repository.getAll();
    expect(stored.length).toBe(2); // viejo + nuevo

    const newToken = stored[1];
    expect(newToken.userId).toBe("user123");
    expect(newToken.tokenHash).toBe("hashed-refresh-mock");
  });

  it("should throw if old refresh token is missing", async () => {
    await expect(handler.handler("", "user123", {})).rejects.toThrow(HttpError);
  });

  it("should throw if userId is empty", async () => {
    await expect(
      handler.handler("some-refresh-token", "", {})
    ).rejects.toThrow("User ID is required");
  });
});
