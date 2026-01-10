import { connectTestDB, disconnectTestDB } from "~/lib/Shared/Infraestructure/setup-test-db";
import { RefreshTokenRepository } from "./RefreshTokenRepository";
import { RefreshTokenModel } from "../models/refresh-token-model";

describe("RefreshTokenRepository – Integration Tests", () => {
  jest.setTimeout(30000);

  let repository: RefreshTokenRepository;

  beforeAll(async () => {
    await connectTestDB();
    repository = new RefreshTokenRepository();
  });

  afterEach(async () => {
    await RefreshTokenModel.deleteMany({});
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

    test("saveRefreshToken() should persist refresh token", async () => {
    await repository.saveRefreshToken(
      "user-1",
      "token-1",
      "hashed-token",
      new Date(Date.now() + 1000 * 60 * 60)
    );

    const token = await RefreshTokenModel.findOne({ tokenId: "token-1" });

    expect(token).not.toBeNull();
    expect(token?.userId).toBe("user-1");
    expect(token?.revoked).toBe(false);
  });

    test("findRefreshTokenById() should return stored token", async () => {
    await RefreshTokenModel.create({
      userId: "user-2",
      tokenId: "token-2",
      tokenHash: "hash",
      expiresAt: new Date(Date.now() + 10000),
    });

    const token = await repository.findRefreshTokenById("token-2");

    expect(token).not.toBeNull();
    expect(token?.tokenId).toBe("token-2");
  });

  test("findRefreshTokenById() should return null if not found", async () => {
    const token = await repository.findRefreshTokenById("not-exists");
    expect(token).toBeNull();
  });

  test("revokeRefreshToken() should mark token as revoked", async () => {
    await RefreshTokenModel.create({
      userId: "user-3",
      tokenId: "token-3",
      tokenHash: "hash",
      expiresAt: new Date(Date.now() + 10000),
      revoked: false,
    });

    await repository.revokeRefreshToken("token-3");

    const token = await RefreshTokenModel.findOne({ tokenId: "token-3" });
    expect(token?.revoked).toBe(true);
  });

    test("replaceRefreshToken() should revoke old token and create new one", async () => {
    await repository.saveRefreshToken(
      "user-4",
      "old-token",
      "old-hash",
      new Date(Date.now() + 10000)
    );

    await repository.replaceRefreshToken(
      "old-token",
      "new-token",
      "new-hash",
      new Date(Date.now() + 20000)
    );

    const oldToken = await RefreshTokenModel.findOne({ tokenId: "old-token" });
    const newToken = await RefreshTokenModel.findOne({ tokenId: "new-token" });

    expect(oldToken?.revoked).toBe(true);
    expect(oldToken?.replacedByToken).toBe("new-token");

    expect(newToken).not.toBeNull();
    expect(newToken?.userId).toBe("user-4");
  });

  test("replaceRefreshToken() should throw if old token does not exist", async () => {
    await expect(
      repository.replaceRefreshToken(
        "missing-token",
        "new-token",
        "hash",
        new Date()
      )
    ).rejects.toThrow("Old refresh token not found");
  });


    test("purgeExpiredTokens() should delete expired tokens", async () => {
    await RefreshTokenModel.create([
      {
        userId: "user-5",
        tokenId: "expired",
        tokenHash: "hash",
        expiresAt: new Date(Date.now() - 1000),
      },
      {
        userId: "user-5",
        tokenId: "valid",
        tokenHash: "hash",
        expiresAt: new Date(Date.now() + 10000),
      },
    ]);

    await repository.purgeExpiredTokens();

    const expired = await RefreshTokenModel.findOne({ tokenId: "expired" });
    const valid = await RefreshTokenModel.findOne({ tokenId: "valid" });

    expect(expired).toBeNull();
    expect(valid).not.toBeNull();
  });
});
