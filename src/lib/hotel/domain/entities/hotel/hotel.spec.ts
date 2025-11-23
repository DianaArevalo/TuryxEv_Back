import { Hotel } from './hotel';
import {
  HotelName,
  HotelEmail,
  HotelPassword,
  HotelPicture,
  HotelScore,
  HotelUpdatedAt,
  HotelRole,
  HotelPlan,
  HotelStatus,
  HotelFreePlanEnd,
  HotelProviderData,
  HotelCreatedAt,
  HotelId,
} from './value-objects';

describe('Hotel - Entity', () => {
  it('should create a hotel entity with id', async () => {
    const createdAt = HotelCreatedAt.now();
    const props = {
      id: 'id',
      name: 'HOTELLASMARGARITAS',
      email: 'info@lasmargaritas.com',
      role: 'HOTEL',
      plan: 'FREE',
      status: 'OPEN',
      password: '$uperPassword159',
      location: {
        address: 'Some address',
        cityName: 'Bogotá',
      },
      providerData: 'AUTH',
    };

    const hotel = new Hotel({
      hotelId: new HotelId(props.id),
      name: HotelName.create(props.name),
      email: HotelEmail.create(props.email),
      password: props.password
        ? HotelPassword.create(props.password)
        : undefined,
      score: HotelScore.create(1),
      createdAt,
      updatedAt: HotelUpdatedAt.now(createdAt),
      role: HotelRole.create(props.role),
      plan: HotelPlan.create(props.plan),
      status: HotelStatus.create(props.status),
      providerData: HotelProviderData.create(props.providerData),
    });

    expect(hotel).toBeTruthy();
  });
});
