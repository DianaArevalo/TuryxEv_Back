import {
  CreateBusiness,
  SoftDeleteBusiness,
} from '~/lib/bussiness/application';
import { BusinessRepository, LocationRepository } from '~/lib/bussiness/domain';
import { InMemoryBusinessRepository } from '~/lib/bussiness/infrastructure/repositories/business-in-memory-repository';
import { InMemoryLocationRepository } from '~/lib/bussiness/infrastructure/repositories/location-in-memory-repository';
import { Limit, Page } from '~/lib/Shared/domain';

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
  email: 'info@business2.com',
  idRole: 'STAFF',
  idPlan: 'PREMIUM',
  status: 'OPEN',
  location: 'Bogotá',
  providerData: 'AUTHGOOGLE',
};

describe('Business/application/soft-delete-business', () => {
  let repository: BusinessRepository;
  let locationRepository: LocationRepository;
  let createBusiness: CreateBusiness;
  let softDelete: SoftDeleteBusiness;

  beforeEach(async () => {
    repository = new InMemoryBusinessRepository();
    locationRepository = new InMemoryLocationRepository();
    createBusiness = new CreateBusiness(repository, locationRepository);
    softDelete = new SoftDeleteBusiness(repository);

    await createBusiness.handler(Business1);
    await createBusiness.handler(Business2);
  });

  it('should mark as BLOCKED a business', async () => {
    await softDelete.handler({ id: 'Business 1' });

    expect(await repository.getAll(new Page(1), new Limit(10))).toHaveLength(1);
  });
});
