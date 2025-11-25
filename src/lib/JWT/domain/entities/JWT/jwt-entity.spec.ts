import { JwtEntity } from "./JwtEntity";


describe("JwtEntity - Domain Entity", () => {
  let validAccess: string;
  let validRefresh: string;
  let now: number;

  beforeEach(() => {
    // valores comunes para todos los tests
    validAccess = "aaa.bbb.ccc"; // JWT falso válido
    validRefresh = "refresh-token-abc-123";
    now = Date.now();
  });

  it("should create a valid JwtEntity from primitives", () => {
    const entity = JwtEntity.fromPrimitives({
      accessToken: validAccess,
      refreshToken: validRefresh,
      expiration: now + 60000, // +1 minuto
    });

    expect(entity).toBeInstanceOf(JwtEntity);
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
    const entity = JwtEntity.fromPrimitives({
      accessToken: validAccess,
      refreshToken: validRefresh,
      expiration: now - 10000,
    });

    expect(entity.isExpired()).toBe(true);
  });
});
