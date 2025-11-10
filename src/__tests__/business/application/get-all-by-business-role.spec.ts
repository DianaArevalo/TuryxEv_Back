import {
  CreateBusiness,
  GetAllBusinessByRole,
} from '~/lib/bussiness/application';
import { BusinessRepository, LocationRepository } from '~/lib/bussiness/domain';
import { InMemoryBusinessRepository } from '~/lib/bussiness/infrastructure/repositories/business-in-memory-repository';
import { InMemoryLocationRepository } from '~/lib/bussiness/infrastructure/repositories/location-in-memory-repository';

const Business1 = {
  name: 'Business 1',
  email: 'info@business1.com',
  idRole: 'BUSINESS',
  idPlan: 'FREE',
  status: 'OPEN',
  password: '$uperPassword159',
  location: 'Bogotá',
  providerData: 'AUTH',
};

const Business2 = {
  name: 'Business 2',
  email: 'info@business1.com',
  idRole: 'STAFF',
  idPlan: 'PREMIUM',
  status: 'OPEN',
  location: 'Bogotá',
  providerData: 'AUTHGOOGLE',
};

describe('Business/application/get-all-by-role', () => {
  let repository: BusinessRepository;
  let locationRepository: LocationRepository;
  let createBusiness: CreateBusiness;
  let getAllBusinessByRole: GetAllBusinessByRole;

  beforeEach(async () => {
    repository = new InMemoryBusinessRepository();
    locationRepository = new InMemoryLocationRepository();
    createBusiness = new CreateBusiness(repository, locationRepository);
    getAllBusinessByRole = new GetAllBusinessByRole(repository);

    await createBusiness.handler(Business1);
    await createBusiness.handler(Business2);
  });

  it('should get all by role', async () => {
    const business = await getAllBusinessByRole.handler({
      role: 'STAFF',
      page: 1,
      limit: 10,
    });

    expect(business).toHaveLength(1);
  });
});
