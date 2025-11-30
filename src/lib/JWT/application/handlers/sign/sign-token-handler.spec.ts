jest.mock("nanoid", () => ({
  nanoid: () => "fixed-nanoid-123",
}));

import { Hasher } from "~/lib/Shared/Infraestructure/Hasher";
import { SignTokenHandler } from "./sign-token-handler";
import { RefreshTokenRepositoryInMemory } from "~/lib/JWT/infraestructure/repositories/refresh-token-repository-in-memory";
import { HttpError } from "~/lib/Shared/domain";
import { RefreshTokenRepository } from "~/lib/JWT/infraestructure/repositories/RefreshTokenRepository";

describe("SignTokenHandler - Use Case", () => {
  let handler: SignTokenHandler;
  let jwtService: any;
  let repository: RefreshTokenRepositoryInMemory;

  beforeEach(() => {
    jwtService = {
      signToken: jest.fn().mockResolvedValue({
        toPrimitives: () => ({
          accessToken: "aaa.bbb.ccc",
          refreshToken: "refresh.user123.fixed-nanoid-123",
          expiration: 123456789,
        }),
      }),
    };

    repository = new RefreshTokenRepositoryInMemory();

    handler = new SignTokenHandler(
      jwtService,
      repository as unknown as RefreshTokenRepository
    );

    jest.spyOn(Hasher, "hash").mockResolvedValue("hashed-refresh-mock");
  });

  it("should sign token and save refresh token", async () => {
    const result = await handler.handler("123", { role: "USER" });

    expect(result).not.toBeNull();

    expect(jwtService.signToken).toHaveBeenCalledTimes(1);
    expect(jwtService.signToken).toHaveBeenCalledWith(
      expect.objectContaining({
        sub: "123",
        role: "USER",
        tid: "fixed-nanoid-123",
      })
    );

    const storedTokens = repository.getAll();

    expect(storedTokens.length).toBe(1);
    expect(storedTokens[0].userId).toBe("123");
    expect(storedTokens[0].tokenHash).toBe("hashed-refresh-mock");

    // ✅ Cambiado: tokenId, no tid
    expect(storedTokens[0].tokenId).toBe("fixed-nanoid-123");
  });

  it("should throw if userId is missing", async () => {
    await expect(handler.handler("", {})).rejects.toThrow(HttpError);
  });
});
