import { HotelCreate, HotelGetByRol } from '~/lib/Hotel/application';
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
  idRole: 'STAFF',
  idPlan: 'FREE',
  status: 'OPEN',
  location: 'Medellín',
  providerData: 'AUTHGOOGLE',
};

describe('Hotel/application/get-all-by-role', () => {
  let repository: HotelRepository;
  let locationRepository: CityRepository;
  let createHotel: HotelCreate;
  let getAllByRoleHotel: HotelGetByRol;

  beforeEach(async () => {
    repository = new InMemoryHotelRepository();
    locationRepository = new InMemoryCityRepository();
    createHotel = new HotelCreate(repository, locationRepository);
    getAllByRoleHotel = new HotelGetByRol(repository);

    await createHotel.handler(Hotel1);
    await createHotel.handler(Hotel2);
  });

  it('should get all by role', async () => {
    const hotels = await getAllByRoleHotel.handler({
      role: 'STAFF',
      page: 1,
      limit: 10,
    });

    expect(hotels).toHaveLength(1);
  });
});
