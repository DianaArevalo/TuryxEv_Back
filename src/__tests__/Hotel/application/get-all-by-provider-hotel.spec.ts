import { HotelCreate, HotelGetByProvider } from '~/lib/Hotel/application';
import {
  CityRepository,
  HotelRepository,
} from '~/lib/Hotel/domain/repositories';
import { InMemoryCityRepository } from '~/lib/Hotel/infraestructure/repositories/InMemoryCityRepository';
import { InMemoryHotelRepository } from '~/lib/Hotel/infraestructure/repositories/InMemoryHotelRepository';

const Hotel1 = {
  name: 'Hotel 1',
  email: 'info@hotel1.com',
  idRole: 'HOTEL',
  idPlan: 'FREE',
  status: 'OPEN',
  password: '$uperPassword159',
  location: 'Bogotá',
  providerData: 'AUTH',
};

const Hotel2 = {
  name: 'Hotel 2',
  email: 'info@hotel2.com',
  idRole: 'HOTEL',
  idPlan: 'FREE',
  status: 'OPEN',
  location: 'Medellín',
  providerData: 'AUTHGOOGLE',
};

const Hotel3 = {
  name: 'Hotel 3',
  email: 'info@hotel3.com',
  idRole: 'HOTEL',
  idPlan: 'PREMIUM',
  status: 'OPEN',
  location: 'Medellín',
  providerData: 'AUTHGOOGLE',
};

describe('Hotel/application/get-all-by-provider', () => {
  let repository: HotelRepository;
  let locationRepository: CityRepository;
  let createHotel: HotelCreate;
  let getAllByProviderHotel: HotelGetByProvider;

  beforeEach(async () => {
    repository = new InMemoryHotelRepository();
    locationRepository = new InMemoryCityRepository();
    createHotel = new HotelCreate(repository, locationRepository);
    getAllByProviderHotel = new HotelGetByProvider(repository);

    await createHotel.handler(Hotel1);
    await createHotel.handler(Hotel2);
    await createHotel.handler(Hotel3);
  });

  it('should get all by provider', async () => {
    const hotels = await getAllByProviderHotel.handler({
      providerData: 'AUTH',
      page: 1,
      limit: 10,
    });

    expect(hotels).toHaveLength(1);
  });
});
