import { HotelCreate, HotelUpdatedStatus } from '~/lib/Hotel/application';
import { HotelRepository, CityRepository, HotelId } from '~/lib/Hotel/domain';
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

describe('Hotel/application/update-status', () => {
  let repository: HotelRepository;
  let locationRepository: CityRepository;
  let createHotel: HotelCreate;
  let updateStatus: HotelUpdatedStatus;
  let hotelId: string;

  beforeEach(async () => {
    repository = new InMemoryHotelRepository();
    locationRepository = new InMemoryCityRepository();
    createHotel = new HotelCreate(repository, locationRepository);
    updateStatus = new HotelUpdatedStatus(repository);

    const created = await createHotel.handler(Hotel1);
    hotelId = created.hotelId as string;
  });

  it('should update hotel status to BLOCKED', async () => {
    await updateStatus.handler({ id: hotelId });

    const updatedHotel = await repository.getOneById(new HotelId(hotelId));
    expect(updatedHotel).toBeTruthy();
    expect(updatedHotel?.status.getValue()).toBe('BLOCKED');
  });
});
