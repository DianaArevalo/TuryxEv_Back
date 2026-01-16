import { JwtEntity } from "./JwtEntity";
import { TokenExpiration } from "./value-objects";


describe("JwtEntity - Domain Entity", () => {
  let validAccess: string;
  let validRefresh: string;
  let now: number;

  beforeEach(() => {
    validAccess = "aaa.bbb.ccc"; // JWT falso válido
    validRefresh = "ddd.eee.fff"; // refresh token con 3 partes
    now = Date.now();
  });

  it("should create a valid JwtEntity from primitives", () => {
    const entity = JwtEntity.fromPrimitives({
      accessToken: validAccess,
      refreshToken: validRefresh,
      expiration: now + 60000, // +1 minuto
    });

    expect(entity).toBeInstanceOf(JwtEntity);
    const primitives = entity.toPrimitives();
    expect(primitives.accessToken).toBe(validAccess);
    expect(primitives.refreshToken).toBe(validRefresh);
    expect(primitives.expiration).toBeGreaterThan(now);
  });

  it("should return false for isExpired() when expiration is in the future", () => {
    const entity = JwtEntity.fromPrimitives({
      accessToken: validAccess,
      refreshToken: validRefresh,
      expiration: now + 60000,
    });

    expect(entity.isExpired()).toBe(false);
  });

   it("should return true for isExpired() when expiration is in the past", () => {
    // Mockeamos TokenExpiration para simular expirado
    jest.spyOn(TokenExpiration, "create").mockImplementation(() => ({
      isExpired: () => true,
      toTimestamp: () => now - 10000,
    } as any));

    const entity = JwtEntity.fromPrimitives({
      accessToken: validAccess,
      refreshToken: validRefresh,
      expiration: now - 10000,
    });

    expect(entity.isExpired()).toBe(true);

    jest.restoreAllMocks();
  });

  it("should throw if refresh token is malformed", () => {
    expect(() =>
      JwtEntity.fromPrimitives({
        accessToken: validAccess,
        refreshToken: "invalid-refresh",
        expiration: now + 60000,
      })
    ).toThrow("Malformed refresh token");
  });
});
