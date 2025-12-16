import { locationService as locationHexagon } from '../../../lib/location/infrastructure/location.composition';
import { BusinessRepositoryMongoAdapter } from './adapters/business-repository.mongodb.adapter';
import { LocationServiceAdapter } from './adapters/location-service.adapter';
import { buildBusinessControllers } from './controllers/express/business.controller-factory';
import { BusinessServiceAdapter } from '../application/adapters';


const businessComposition = () => {
  const businessRepository = new BusinessRepositoryMongoAdapter();
  const locationService = new LocationServiceAdapter(locationHexagon);

  const {
    controllers,
    useCases: { 
      editBusinessUseCase,
      createBusinessUseCase,
      getBusinessesUseCase,
      getOneBusinessUseCase,
      softDeleteUseCase,
    },
  } = buildBusinessControllers(businessRepository, locationService );

  const businessService = new BusinessServiceAdapter({
    editBusinessUseCase,
    createBusinessUseCase,
    getBusinessesUseCase,
    getOneBusinessUseCase,
    softDeleteBusinessUseCase: softDeleteUseCase,
  });

  return { controllers, businessService };
};

export const { controllers, businessService } = businessComposition();
