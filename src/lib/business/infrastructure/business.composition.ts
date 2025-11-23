import { BusinessServiceAdapter } from '../application';
import { BusinessRepositoryMongoAdapter } from './adapters/business-repository.mongodb.adapter';
import { LocationServiceAdapter } from './adapters/location-service.adapter';
import { buildBusinessControllers } from './controllers/express/business.controller-factory';

import { locationService as locationHexagon } from '~/lib/location/infrastructure/location.composition';

const businessComposition = () => {
  const locationService = new LocationServiceAdapter(locationHexagon);
  const businessRepository = new BusinessRepositoryMongoAdapter(
    locationService,
  );

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
