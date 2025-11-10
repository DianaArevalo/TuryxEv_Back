import { HotelCreate, HotelGetOneById } from '~/lib/Hotel/application';
import {
  CityRepository,
  HotelRepository,
} from '~/lib/Hotel/domain/repositories';
import { InMemoryCityRepository } from '~/lib/Hotel/infraestructure/repositories/InMemoryCityRepository';
import { InMemoryHotelRepository } from '~/lib/Hotel/infraestructure/repositories/InMemoryHotelRepository';
import { HttpError } from '~/lib/Shared/domain';

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

describe('Hotel/application/get-one-by-id-hotel', () => {
  let repository: HotelRepository;
  let locationRepository: CityRepository;
  let createHotel: HotelCreate;
  let getOneById: HotelGetOneById;
  let hotelId2: string;

  beforeEach(async () => {
    repository = new InMemoryHotelRepository();
    locationRepository = new InMemoryCityRepository();
    createHotel = new HotelCreate(repository, locationRepository);
    getOneById = new HotelGetOneById(repository);

    await createHotel.handler(Hotel1);

    const created2 = await createHotel.handler(Hotel2);
    hotelId2 = created2.hotelId as string;
  });

  it('should get one hotel by id', async () => {
    const hotel = await getOneById.handler({ id: hotelId2 });

    expect(hotel).toBeTruthy();
    expect(hotel.name).toBe('Hotel 2');
  });

  it("should throw error when id isn't found", async () => {
    await expect(
      getOneById.handler({ id: 'non-existent-id' }),
    ).rejects.toBeInstanceOf(HttpError);
  });
});
