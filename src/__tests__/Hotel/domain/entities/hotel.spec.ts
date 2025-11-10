import {
  Hotel,
  HotelId,
  HotelName,
  HotelEmail,
  HotelPassword,
  HotelLocation,
  HotelPlan,
  HotelRole,
  HotelScore,
  HotelStatus,
  HotelCreatedAt,
  HotelUpdatedAt,
  HotelProviderData,
} from '../../../../lib/Hotel/domain';
import { HotelPicture } from '../../../../lib/Hotel/domain/entities/Hotel/value-objects/HotelPicture'; //"~/lib/hotel/domain/value-objects/HotelPicture";

import { HttpError } from '~/lib/Shared/domain/exeptions';

describe('Hotel Entity', () => {
  it('should create a valid Hotel instance', () => {
    const hotel = new Hotel({
      hotelId: new HotelId('1'),
      name: new HotelName('Turxy Hotel'),
      email: new HotelEmail('info@turxy.com'),
      password: new HotelPassword('$uperPassword123'),
      location: new HotelLocation('Bogotá'),
      picture: new HotelPicture('https://example.com/hotel.jpg'),
      plan: new HotelPlan('FREE'),
      role: new HotelRole('HOTEL'),
      score: new HotelScore(5),
      status: new HotelStatus('OPEN'),
      createdAt: new HotelCreatedAt(new Date()),
      updatedAt: new HotelUpdatedAt(new Date()),
      providerData: new HotelProviderData('AUTH'),
    });

    expect(hotel).toBeInstanceOf(Hotel);
    expect(hotel.name.value).toBe('Turxy Hotel');
    expect(hotel.status.getValue()).toBe('OPEN');
  });

  it('should return a plain object from toResponse()', () => {
    const date = new Date();

    const hotel = new Hotel({
      hotelId: new HotelId('123'),
      name: new HotelName('Turxy Hotel'),
      email: new HotelEmail('info@turxy.com'),
      password: new HotelPassword('$uperPassword123'),
      location: new HotelLocation('Bogotá'),
      plan: new HotelPlan('FREE'),
      role: new HotelRole('HOTEL'),
      score: new HotelScore(5),
      status: new HotelStatus('CLOSED'),
      createdAt: new HotelCreatedAt(date),
      updatedAt: new HotelUpdatedAt(date),
      providerData: new HotelProviderData('AUTH'),
    });

    const response = hotel.toResponse();

    expect(response).toMatchObject({
      name: 'Turxy Hotel',
      email: 'info@turxy.com',
      plan: 'FREE',
      role: 'HOTEL',
      score: 5,
      status: 'CLOSED',
      providerData: 'AUTH',
    });
  });

  it('should block the hotel when calling block()', () => {
    const hotel = new Hotel({
      hotelId: new HotelId('1'),
      name: new HotelName('Turxy Hotel'),
      email: new HotelEmail('info@turxy.com'),
      password: new HotelPassword('$uperPassword123'),
      location: new HotelLocation('Bogotá'),
      plan: new HotelPlan('FREE'),
      role: new HotelRole('HOTEL'),
      score: new HotelScore(5),
      status: new HotelStatus('BLOCKED'),
      createdAt: new HotelCreatedAt(new Date()),
      updatedAt: new HotelUpdatedAt(new Date()),
      providerData: new HotelProviderData('AUTH'),
    });

    hotel.block();

    expect(hotel.status.getValue()).toBe('BLOCKED');
  });

  it('should throw an error if email is invalid', () => {
    expect(() => {
      new Hotel({
        hotelId: new HotelId('1'),
        name: new HotelName('Turxy Hotel'),
        email: HotelEmail.create('invalid-email'), // ❌ invalido
        password: new HotelPassword('$uperPassword123'),
        location: new HotelLocation('Bogotá'),
        plan: new HotelPlan('FREE'),
        role: new HotelRole('HOTEL'),
        score: new HotelScore(5),
        status: new HotelStatus('OPEN'),
        createdAt: new HotelCreatedAt(new Date()),
        updatedAt: new HotelUpdatedAt(new Date()),
        providerData: new HotelProviderData('AUTH'),
      });
    }).toThrow(HttpError);
  });
});
