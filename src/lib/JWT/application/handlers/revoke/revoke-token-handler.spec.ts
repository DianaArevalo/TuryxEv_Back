import { RefreshTokenRepositoryInMemory } from "~/lib/JWT/infraestructure/repositories/refresh-token-repository-in-memory";
import { RevokeTokenHandler } from "./revoke-token-handler";
import { HttpError } from "~/lib/Shared/domain";
import { RefreshTokenRepository } from "~/lib/JWT/infraestructure/repositories/RefreshTokenRepository";

describe("RevokeTokenHandler - Use Case", () => {
  let handler: RevokeTokenHandler;
  let jwtService: any; // mock
  let repository: RefreshTokenRepositoryInMemory;

  beforeEach(() => {
    jwtService = {
      verifyToken: jest.fn(),
    };

    repository = new RefreshTokenRepositoryInMemory();
    handler = new RevokeTokenHandler(
      jwtService,
      repository as unknown as RefreshTokenRepository
    );
  });

  it("should revoke a valid token", async () => {
    const fakeToken = "fake.jwt.token";

    jwtService.verifyToken.mockResolvedValue({
      sub: "user123",
      tid: "token123",
    });

    const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

    await repository.saveRefreshToken(
      "user123",
      "token123",
      "hash",
      new Date(Date.now() + REFRESH_TOKEN_TTL_MS)
    );

    await handler.handler(fakeToken, "user123");

    const stored = await repository.findRefreshTokenById("token123");
    expect(stored?.revoked).toBe(true);
  });

  it("should throw if token is missing", async () => {
    await expect(handler.handler("", "user123")).rejects.toThrow(HttpError);
  });

  it("should throw if token does not belong to user", async () => {
    const fakeToken = "fake.jwt.token";

    jwtService.verifyToken.mockResolvedValue({
      sub: "user123",
      tid: "token123",
    });

    await repository.saveRefreshToken(
      "user123",
      "token123",
      "hash",
      new Date(Date.now() + 1000 * 60 * 60)
    );

    await expect(handler.handler(fakeToken, "anotherUser"))
      .rejects.toThrow(HttpError);
  });

  it("should throw if token not found in repository", async () => {
    const fakeToken = "fake.jwt.token";

    jwtService.verifyToken.mockResolvedValue({
      sub: "user123",
      tid: "token123",
    });

    await expect(handler.handler(fakeToken, "user123"))
      .rejects.toThrow(HttpError);
  });

  it("should throw if userId is empty", async () => {
    const fakeToken = "fake.jwt.token";

    jwtService.verifyToken.mockResolvedValue({
      sub: "user123",
      tid: "token123",
    });

    await expect(handler.handler(fakeToken, ""))
      .rejects.toThrow("User ID is required");
  });
});
