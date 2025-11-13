import { locationService as locationHexagon } from '~/lib/location/infrastructure/location.composition';
import { BusinessRepositoryMongoAdapter } from './adapters/business-repository.mongodb.adapter';
import { LocationServiceAdapter } from './adapters/location-service.adapter';
import { buildBusinessControllers } from './controllers/express/business.controller-factory';
import { BusinessServiceAdapter } from '../application';

const businessComposition = () => {
  const businessRepository = new BusinessRepositoryMongoAdapter();
  const locationService = new LocationServiceAdapter(locationHexagon);

  const {
    controllers,
    useCases: { editBusinessUseCase },
  } = buildBusinessControllers(businessRepository, locationService);

  const businessService = new BusinessServiceAdapter({
    editBusinessUseCase,
  });

  return { controllers, businessService };
};

export const { controllers, businessService } = businessComposition();
