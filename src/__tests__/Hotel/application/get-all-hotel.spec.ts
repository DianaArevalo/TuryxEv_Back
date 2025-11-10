import { HotelCreate, HotelGetALL } from '~/lib/Hotel/application';
import { HotelRepository, CityRepository } from '~/lib/Hotel/domain';
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

describe('Hotel/application/get-all', () => {
  let repository: HotelRepository;
  let locationRepository: CityRepository;
  let createHotel: HotelCreate;
  let getAllHotels: HotelGetALL;

  beforeEach(async () => {
    repository = new InMemoryHotelRepository();
    locationRepository = new InMemoryCityRepository();
    createHotel = new HotelCreate(repository, locationRepository);
    getAllHotels = new HotelGetALL(repository);

    await createHotel.handler(Hotel1);
    await createHotel.handler(Hotel2);
  });

  it('should get all hotels', async () => {
    const hotels = await getAllHotels.handler({
      page: 1,
      limit: 10,
    });

    expect(hotels).toHaveLength(2);
    expect(hotels[0].name).toBe('Hotel 1');
    expect(hotels[1].name).toBe('Hotel 2');
  });

  it('should get 1 hotel with pagination', async () => {
    const hotels = await getAllHotels.handler({
      page: 2,
      limit: 1,
    });

    expect(hotels).toHaveLength(1);
    expect(hotels[0].name).toBe('Hotel 2');
  });
});
