export class HotelFreePlanEnd {
  constructor(private readonly value: Date) {}

  static create(createdAt: Date): HotelFreePlanEnd {
    const expiration = new Date(createdAt);
    expiration.setDate(expiration.getDate() + 15);
    return new HotelFreePlanEnd(expiration);
  }

  hasExpired(currentDate: Date): boolean {
    return currentDate > this.value;
  }

  getValue(): Date {
    return this.value;
  }
}
