jest.mock("nanoid", () => ({
  nanoid: jest.fn(),
}));

jest.mock("../../../../../lib/Shared/Infraestructure/Hasher", () => ({
  Hasher: {
    verify: jest.fn(),
    hash: jest.fn(),
  },
}));

import { RefreshTokenRepository } from "~/lib/JWT/infraestructure/repositories/RefreshTokenRepository";
import { JwtServiceAdapter } from "../../adapters/jwt-service";
import { RefreshTokenHandler } from "./refresh-token-handler";
import { HttpError } from "../../../../../lib/Shared/domain";
import { JwtEntity } from "../../../../../lib/JWT/domain/entities";
import { Hasher } from "../../../../../lib/Shared/Infraestructure/Hasher";
import { nanoid } from "nanoid";

describe("RefreshTokenHandler", () => {
  let jwtService: jest.Mocked<JwtServiceAdapter>;
  let tokenRepository: jest.Mocked<RefreshTokenRepository>;
  let handler: RefreshTokenHandler; 

  beforeEach(() => {
    jwtService = {
      verifyToken: jest.fn(),
      signToken: jest.fn(),
    } as unknown as jest.Mocked<JwtServiceAdapter>;

    tokenRepository = {
      findRefreshTokenById: jest.fn(),
      saveRefreshToken: jest.fn(),
      revokeRefreshToken: jest.fn(),
      replaceRefreshToken: jest.fn(),
      purgeExpiredTokens: jest.fn(),
    } as unknown as jest.Mocked<RefreshTokenRepository>;

    handler = new RefreshTokenHandler(jwtService, tokenRepository);
  });

    it("should refresh token successfully", async () => {
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
    } as any);

    (Hasher.verify as jest.Mock).mockResolvedValue(true);
    (Hasher.hash as jest.Mock).mockResolvedValue("hashed-new-token");

    const jwtEntityMock = {
      toPrimitives: () => ({
        refreshToken: "new-refresh-token",
      }),
    } as JwtEntity;

    jwtService.signToken.mockResolvedValue(jwtEntityMock);

    const result = await handler.handler(
      "old-refresh-token",
      "user-123",
      { role: "BUSINESS" } as any
    );

    expect(jwtService.verifyToken).toHaveBeenCalledWith("old-refresh-token");

    expect(tokenRepository.findRefreshTokenById).toHaveBeenCalledWith(
      "old-token-id"
    );

    expect(tokenRepository.saveRefreshToken).toHaveBeenCalled();

    expect(result).toBe(jwtEntityMock);
  });


    it("should throw ValidationError if refresh token is missing", async () => {
    await expect(
      handler.handler("", "user-123", {} as any)
    ).rejects.toThrow(HttpError);

    expect(jwtService.verifyToken).not.toHaveBeenCalled();
  });

    it("should throw ValidationError if userId is missing", async () => {
    await expect(
      handler.handler("token", "", {} as any)
    ).rejects.toThrow(HttpError);
  });

      it("should throw ValidationError if token does not belong to user", async () => {
    jwtService.verifyToken.mockResolvedValue({
      sub: "another-user",
      tid: "token-id",
    });

    await expect(
      handler.handler("refresh", "user-123", {} as any)
    ).rejects.toThrow(HttpError);
  });


    it("should throw ValidationError if refresh token is revoked", async () => {
    jwtService.verifyToken.mockResolvedValue({
      sub: "user-123",
      tid: "token-id",
    });

    tokenRepository.findRefreshTokenById.mockResolvedValue({
      revoked: true,
    } as any);

    await expect(
      handler.handler("refresh", "user-123", {} as any)
    ).rejects.toThrow(HttpError);
  });

    it("should throw ValidationError if token hash verification fails", async () => {
    jwtService.verifyToken.mockResolvedValue({
      sub: "user-123",
      tid: "token-id",
    });

    tokenRepository.findRefreshTokenById.mockResolvedValue({
      revoked: false,
      tokenHash: "hash",
    } as any);

    (Hasher.verify as jest.Mock).mockResolvedValue(false);

    await expect(
      handler.handler("refresh", "user-123", {} as any)
    ).rejects.toThrow(HttpError);
  });
})