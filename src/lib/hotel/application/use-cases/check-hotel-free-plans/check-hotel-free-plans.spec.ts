import { CheckHotelFreePlansUseCase } from './check-hotel-free-plans';

import {
  HotelRepositoryPort,
  HotelLocation,
  Hotel,
  HotelName,
  HotelEmail,
  HotelPassword,
  HotelPlan,
  HotelRole,
  HotelScore,
  HotelStatus,
  HotelCreatedAt,
  HotelUpdatedAt,
  HotelFreePlanEnd,
  HotelProviderData,
} from '~/lib/hotel/domain';
import { HotelRepositoryInMemoryAdapter } from '~/lib/hotel/infrastructure/adapters/hotel-repository.in-memory.adapter';
import { LimitValueObject, PageValueObject } from '~/lib/shared/domain';

describe('CheckHotelFreePlans (with InMemoryHotelRepository)', () => {
  let repository: HotelRepositoryPort;
  let useCase: CheckHotelFreePlansUseCase;

  beforeEach(() => {
    repository = new HotelRepositoryInMemoryAdapter();
    useCase = new CheckHotelFreePlansUseCase(repository);
  });

  it('should block hotels whose FREE plan has expired', async () => {
    // Arrange
    const now = new Date('2025-11-01');

    // hotel FREE con plan vencido (15 días después de su creación)
    const expiredHotel = new Hotel({
      name: HotelName.create('Hotel Expired'),
      email: HotelEmail.create('expired@example.com'),
      password: HotelPassword.create('$ecretPassword456'),
      location: HotelLocation.create({
        address: 'Some addres',
        cityName: 'Bogotá',
      }),
      plan: HotelPlan.create('FREE'),
      role: HotelRole.create('STAFF'),
      score: HotelScore.create(5),
      status: HotelStatus.create('OPEN'),
      createdAt: new HotelCreatedAt(new Date('2025-10-01')),
      updatedAt: new HotelUpdatedAt(new Date('2025-10-01')),
      freePlanEnd: HotelFreePlanEnd.create(new Date('2025-10-01')), // expira 2025-10-16
      providerData: HotelProviderData.create('AUTH'),
    });

    // hotel FREE aún vigente
    const activeHotel = new Hotel({
      name: HotelName.create('Hotel Active'),
      email: HotelEmail.create('active@example.com'),
      password: HotelPassword.create('$ecretPassword789'),
      location: HotelLocation.create({
        address: 'Some addres',
        cityName: 'Medellín',
      }),
      plan: HotelPlan.create('FREE'),
      role: HotelRole.create('HOTEL'),
      score: HotelScore.create(4),
      status: HotelStatus.create('CLOSED'),
      createdAt: new HotelCreatedAt(new Date('2025-10-20')),
      updatedAt: new HotelUpdatedAt(new Date('2025-10-20')),
      freePlanEnd: HotelFreePlanEnd.create(new Date('2025-10-20')), // expira 2025-11-04
      providerData: HotelProviderData.create('AUTHGOOGLE'),
    });

    await repository.create(expiredHotel);
    await repository.create(activeHotel);

    // Act
    await useCase.execute({ currentDate: now });

    // Assert
    const allHotels = await repository.getAll(
      new PageValueObject(1),
      new LimitValueObject(10),
    );
    const expired = allHotels.find(
      (h) => h.email.value === 'expired@example.com',
    );
    const active = allHotels.find(
      (h) => h.email.value === 'active@example.com',
    );

    expect(expired?.status.value).toBe('BLOCKED');
    expect(active?.status.value).toBe('CLOSED');
  });

  it('should not modify hotels with paid plans', async () => {
    const now = new Date(Date.now());

    const paidHotel = new Hotel({
      name: HotelName.create('Hotel Premium'),
      email: HotelEmail.create('premium@example.com'),
      password: HotelPassword.create('$ecretPassword123'),
      location: HotelLocation.create({
        address: 'Some addres',
        cityName: 'Cali',
      }),
      plan: HotelPlan.create('PREMIUM'),
      role: HotelRole.create('HOTEL'),
      score: HotelScore.create(5),
      status: HotelStatus.create('OPEN'),
      createdAt: new HotelCreatedAt(now),
      updatedAt: new HotelUpdatedAt(now),
      providerData: HotelProviderData.create('AUTHFACEBOOK'),
    });

    await repository.create(paidHotel);

    await useCase.execute({});

    const allHotels = await repository.getAll(
      new PageValueObject(1),
      new LimitValueObject(10),
    );
    const premium = allHotels.find(
      (h) => h.email.value === 'premium@example.com',
    );

    expect(premium?.status.value).toBe('OPEN');
  });
});
