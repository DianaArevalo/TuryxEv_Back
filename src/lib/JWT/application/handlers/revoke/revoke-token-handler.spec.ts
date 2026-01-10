import { HttpError } from "~/lib/Shared/domain";
import { RevokeTokenHandler } from "./revoke-token-handler";
import { RefreshTokenRepository } from "~/lib/JWT/infraestructure/repositories/RefreshTokenRepository";

describe("RevokeTokenHandler", () => {
  let handler: RevokeTokenHandler;
  let jwtService: any;
  let repository: jest.Mocked<RefreshTokenRepository>;

  beforeEach(() => {
    jwtService = {
      verifyToken: jest.fn(),
    };

    repository = {
      findRefreshTokenById: jest.fn(),
      revokeRefreshToken: jest.fn(),
      saveRefreshToken: jest.fn(),
      replaceRefreshToken: jest.fn(),
      purgeExpiredTokens: jest.fn(),
    } as unknown as jest.Mocked<RefreshTokenRepository>;

    handler = new RevokeTokenHandler(jwtService, repository);
  });

  it("should revoke a valid token", async () => {
    jwtService.verifyToken.mockResolvedValue({
      sub: "user123",
      tid: "token123",
    });

    repository.findRefreshTokenById.mockResolvedValue({
      tokenId: "token123",
      revoked: false,
    } as any);

    await handler.handler("fake.jwt.token", "user123");

    expect(jwtService.verifyToken).toHaveBeenCalledWith("fake.jwt.token");
    expect(repository.findRefreshTokenById).toHaveBeenCalledWith("token123");
    expect(repository.revokeRefreshToken).toHaveBeenCalledWith("token123");
  });

  it("should throw if userId is empty", async () => {
    await expect(
      handler.handler("fake.jwt.token", "")
    ).rejects.toThrow(HttpError);

    expect(jwtService.verifyToken).not.toHaveBeenCalled();
  });

  it("should throw if refresh token is missing", async () => {
    await expect(
      handler.handler("", "user123")
    ).rejects.toThrow(HttpError);

    expect(jwtService.verifyToken).not.toHaveBeenCalled();
  });

  it("should throw if token does not belong to user", async () => {
    jwtService.verifyToken.mockResolvedValue({
      sub: "anotherUser",
      tid: "token123",
    });

    await expect(
      handler.handler("fake.jwt.token", "user123")
    ).rejects.toThrow(HttpError);

    expect(repository.findRefreshTokenById).not.toHaveBeenCalled();
  });

  it("should throw if token is not found", async () => {
    jwtService.verifyToken.mockResolvedValue({
      sub: "user123",
      tid: "token123",
    });

    repository.findRefreshTokenById.mockResolvedValue(null);

    await expect(
      handler.handler("fake.jwt.token", "user123")
    ).rejects.toThrow(HttpError);

    expect(repository.revokeRefreshToken).not.toHaveBeenCalled();
  });
});