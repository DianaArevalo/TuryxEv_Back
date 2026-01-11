jest.mock("nanoid", () => ({
  nanoid: jest.fn(),
}));

jest.mock("../../../../../lib/Shared/Infraestructure/Hasher", () => ({
  Hasher: {
    verify: jest.fn(),
    hash: jest.fn(),
  },
}));

import { nanoid } from "nanoid";
import { RefreshTokenHandler } from "./refresh-token-handler";
import { RefreshTokenRepository } from "~/lib/JWT/infraestructure/repositories/RefreshTokenRepository";
import { JwtApplicationPort } from "../../adapters/JwtApplicationPort";
import { JwtEntity } from "~/lib/JWT/domain/entities";
import { Hasher } from "../../../../../lib/Shared/Infraestructure/Hasher";
import { HttpError } from "../../../../../lib/Shared/domain";

describe("RefreshTokenHandler", () => {
  let handler: RefreshTokenHandler;
  let jwtService: jest.Mocked<JwtApplicationPort>;
  let tokenRepository: jest.Mocked<RefreshTokenRepository>;

  beforeEach(() => {
    jwtService = {
      signToken: jest.fn(),
      verifyToken: jest.fn(),
    };

    tokenRepository = {
      findRefreshTokenById: jest.fn(),
      saveRefreshToken: jest.fn(),
      revokeRefreshToken: jest.fn(),
      replaceRefreshToken: jest.fn(),
      purgeExpiredTokens: jest.fn(),
    };

    handler = new RefreshTokenHandler(jwtService, tokenRepository);
  });

  it("should refresh token successfully", async () => {
    // Arrange
    (nanoid as jest.Mock).mockReturnValue("new-token-id");

    jwtService.verifyToken.mockResolvedValue({
      sub: "user-123",
      tid: "old-token-id",
    });

    tokenRepository.findRefreshTokenById.mockResolvedValue({
      userId: "user-123",
      tokenId: "old-token-id",
      tokenHash: "hashed-old-token",
      revoked: false,
      expiresAt: new Date(Date.now() + 10000),
    });

    (Hasher.verify as jest.Mock).mockResolvedValue(true);
    (Hasher.hash as jest.Mock).mockResolvedValue("hashed-new-token");

    const jwtEntity = JwtEntity.fromPrimitives({
      accessToken: "new.access.token",
      refreshToken: "refresh.user123.new-token-id",
      expiration: Date.now() + 60 * 60 * 1000,
    });

    jwtService.signToken.mockResolvedValue(jwtEntity);

    // Act
    const result = await handler.handler(
      "old-refresh-token",
      "user-123",
      { role: "BUSINESS" }
    );

    // Assert
    expect(jwtService.verifyToken).toHaveBeenCalledWith("old-refresh-token");

    expect(tokenRepository.findRefreshTokenById).toHaveBeenCalledWith(
      "old-token-id"
    );

    expect(Hasher.verify).toHaveBeenCalledWith(
      "old-refresh-token",
      "hashed-old-token"
    );

    expect(tokenRepository.replaceRefreshToken).toHaveBeenCalledWith(
      "old-token-id",
      "new-token-id",
      "hashed-new-token",
      expect.any(Date)
    );

    expect(result).toBe(jwtEntity);
  });

  it("should throw if refresh token is missing", async () => {
    await expect(
      handler.handler("", "user-123", { role: "USER" })
    ).rejects.toThrow(HttpError);

    expect(jwtService.verifyToken).not.toHaveBeenCalled();
  });

  it("should throw if userId is missing", async () => {
    await expect(
      handler.handler("token", "", { role: "USER" })
    ).rejects.toThrow(HttpError);
  });

  it("should throw if token does not belong to user", async () => {
    jwtService.verifyToken.mockResolvedValue({
      sub: "another-user",
      tid: "token-id",
    });

    await expect(
      handler.handler("refresh", "user-123", { role: "USER" })
    ).rejects.toThrow(HttpError);
  });

  it("should throw if refresh token is revoked", async () => {
    jwtService.verifyToken.mockResolvedValue({
      sub: "user-123",
      tid: "token-id",
    });

    tokenRepository.findRefreshTokenById.mockResolvedValue({
      userId: "user-123",
      tokenId: "token-id",
      tokenHash: "hash",
      revoked: true,
      expiresAt: new Date(),
    });

    await expect(
      handler.handler("refresh", "user-123", { role: "USER" })
    ).rejects.toThrow(HttpError);
  });

  it("should throw if token hash verification fails", async () => {
    jwtService.verifyToken.mockResolvedValue({
      sub: "user-123",
      tid: "token-id",
    });

    tokenRepository.findRefreshTokenById.mockResolvedValue({
      userId: "user-123",
      tokenId: "token-id",
      tokenHash: "hash",
      revoked: false,
      expiresAt: new Date(),
    });

    (Hasher.verify as jest.Mock).mockResolvedValue(false);

    await expect(
      handler.handler("refresh", "user-123", { role: "USER" })
    ).rejects.toThrow(HttpError);
  });
});
