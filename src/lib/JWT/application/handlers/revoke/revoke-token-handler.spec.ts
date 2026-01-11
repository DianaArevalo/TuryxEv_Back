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

import { RefreshTokenRepository } from "~/lib/JWT/infraestructure/repositories/RefreshTokenRepository";
import { JwtApplicationPort } from "../../adapters/JwtApplicationPort";
import { JwtEntity, JwtPayload } from "~/lib/JWT/domain/entities";
import { Hasher } from "../../../../../lib/Shared/Infraestructure/Hasher";
import { HttpError } from "../../../../../lib/Shared/domain";
import { RevokeTokenHandler } from "./revoke-token-handler";

describe("RevokeTokenHandler", () => {
  let handler: RevokeTokenHandler;
  let jwtService: jest.Mocked<JwtApplicationPort>;
  let tokenRepository: jest.Mocked<RefreshTokenRepository>;

  beforeEach(() => {
    jwtService = {
        signToken: jest.fn(),
      verifyToken: jest.fn(),
    };

    tokenRepository = {
      findRefreshTokenById: jest.fn(),
      revokeRefreshToken: jest.fn(),
      saveRefreshToken: jest.fn(),
      replaceRefreshToken: jest.fn(),
      purgeExpiredTokens: jest.fn(),
    } as unknown as jest.Mocked<RefreshTokenRepository>;

    handler = new RevokeTokenHandler(jwtService, tokenRepository);
  });

   it("should revoke refresh token successfully", async () => {
    // Arrange
    const payload: JwtPayload = {
      sub: "user-123",
      tid: "token-id-123",
    };

    jwtService.verifyToken.mockResolvedValue(payload);

    tokenRepository.findRefreshTokenById.mockResolvedValue({
      userId: "user-123",
      tokenId: "token-id-123",
      tokenHash: "hashed-token",
      revoked: false,
      expiresAt: new Date(Date.now() + 10000),
    });

    // Act
    await handler.handler("refresh-token", "user-123");

    // Assert
    expect(jwtService.verifyToken).toHaveBeenCalledWith("refresh-token");

    expect(tokenRepository.findRefreshTokenById).toHaveBeenCalledWith(
      "token-id-123"
    );

    expect(tokenRepository.revokeRefreshToken).toHaveBeenCalledWith(
      "token-id-123"
    );
  });

  it("should throw if userId is missing", async () => {
    await expect(
      handler.handler("refresh-token", "")
    ).rejects.toThrow(HttpError);

    expect(jwtService.verifyToken).not.toHaveBeenCalled();
  });

  it("should throw if refresh token is missing", async () => {
    await expect(
      handler.handler("", "user-123")
    ).rejects.toThrow(HttpError);

    expect(jwtService.verifyToken).not.toHaveBeenCalled();
  });

  it("should throw if token does not belong to user", async () => {
    const payload: JwtPayload = {
      sub: "another-user",
      tid: "token-id",
    };

    jwtService.verifyToken.mockResolvedValue(payload);

    await expect(
      handler.handler("refresh-token", "user-123")
    ).rejects.toThrow(HttpError);

    expect(tokenRepository.findRefreshTokenById).not.toHaveBeenCalled();
  });

  it("should throw if token record is not found", async () => {
    const payload: JwtPayload = {
      sub: "user-123",
      tid: "token-id",
    };

    jwtService.verifyToken.mockResolvedValue(payload);
    tokenRepository.findRefreshTokenById.mockResolvedValue(null);

    await expect(
      handler.handler("refresh-token", "user-123")
    ).rejects.toThrow(HttpError);

    expect(tokenRepository.revokeRefreshToken).not.toHaveBeenCalled();
  });
});