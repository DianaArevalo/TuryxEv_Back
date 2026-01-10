jest.mock("nanoid", () => ({
  nanoid: () => "fixed-nanoid-123",
}));

import { SignTokenHandler } from "./sign-token-handler";
import { RefreshTokenRepository } from "../../../infraestructure/repositories/RefreshTokenRepository";
import { Hasher } from "../../../../../lib/Shared/Infraestructure/Hasher";
import { HttpError } from "../../../../../lib/Shared/domain";
import { JwtEntity } from "~/lib/JWT/domain/entities";
import { JwtApplicationPort } from "../../adapters/JwtApplicationPort";


describe("SignTokenHandler", () => {
  let handler: SignTokenHandler;
  let jwtService: jest.Mocked<JwtApplicationPort>;
  let repository: jest.Mocked<RefreshTokenRepository>;

  beforeEach(() => {
  const fakeJwtEntity = JwtEntity.fromPrimitives({
    accessToken: "aaa.bbb.ccc",
    refreshToken: "refresh.user123.fixed-nanoid-123",
    expiration: 123456789,
  });

  jwtService = {
    signToken: jest.fn().mockResolvedValue(fakeJwtEntity),
    verifyToken: jest.fn(),
  };

  repository = {
    saveRefreshToken: jest.fn(),
    findRefreshTokenById: jest.fn(),
    revokeRefreshToken: jest.fn(),
    replaceRefreshToken: jest.fn(),
    purgeExpiredTokens: jest.fn(),
  };

  jest.spyOn(Hasher, "hash").mockResolvedValue("hashed-refresh-mock");

  handler = new SignTokenHandler(jwtService, repository);
});


  it("should sign token and save refresh token", async () => {
    const result = await handler.handler("123", { role: "USER" });

    expect(result).toBeDefined();

    expect(jwtService.signToken).toHaveBeenCalledWith({
      sub: "123",
      role: "USER",
      tid: "fixed-nanoid-123",
    });

    expect(Hasher.hash).toHaveBeenCalledWith(
      "refresh.user123.fixed-nanoid-123"
    );

    expect(repository.saveRefreshToken).toHaveBeenCalledWith(
      "123",
      "fixed-nanoid-123",
      "hashed-refresh-mock",
      expect.any(Date)
    );
  });

  it("should throw if userId is missing", async () => {
    await expect(handler.handler("", {})).rejects.toThrow(HttpError);

    expect(jwtService.signToken).not.toHaveBeenCalled();
    expect(repository.saveRefreshToken).not.toHaveBeenCalled();
  });
});
