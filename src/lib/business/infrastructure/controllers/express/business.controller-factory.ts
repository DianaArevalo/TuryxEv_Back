
import { 
  CreateBusinessUseCase, 
  EditBusinessUseCase, 
  GetBusinessesUseCase, 
  GetOneBusinessUseCase, 
  SoftDeleteBusinessUseCase 
} from '../../../../../lib/business/application/use-cases';
import {
  BusinessRepositoryPort,
} from '../../../../../lib/business/domain';
import { CreateBusinessController } from './create-business.controller';
import { EditBusinessController } from './edit-business.controller';
import { GetBusinessesController } from './get-businesses.controller';
import { GetOneBusinessController } from './get-one-business.controller';
import { SoftDeleteBusinessController } from './soft-delete.controller';
import { BusinessLocationServicePort } from '../../../../../lib/business/domain/ports/driving/business-location-service-port';

export const buildBusinessControllers = (
  businessRepository: BusinessRepositoryPort,
  locationService: BusinessLocationServicePort,
) => {
  const createBusinessUseCase = new CreateBusinessUseCase(
    businessRepository,    
  );
  const createBusinessController = new CreateBusinessController(
    createBusinessUseCase,
  );

  const editBusinessUseCase = new EditBusinessUseCase(
    businessRepository,
    locationService,
  );
  const editBusinessController = new EditBusinessController(
    editBusinessUseCase,
  );

  const getBusinessesUseCase = new GetBusinessesUseCase(businessRepository);
  const getBusinessesController = new GetBusinessesController(
    getBusinessesUseCase,
  );

  const getOneBusinessUseCase = new GetOneBusinessUseCase(businessRepository);
  const getOneBusinessController = new GetOneBusinessController(
    getOneBusinessUseCase,
  );

  const softDeleteUseCase = new SoftDeleteBusinessUseCase(businessRepository);
  const softDeleteController = new SoftDeleteBusinessController(
    softDeleteUseCase,
  );

  return {
    controllers: {
      createBusinessController,
      editBusinessController,
      getBusinessesController,
      getOneBusinessController,
      softDeleteController,
    },
    useCases: {
      createBusinessUseCase,
      editBusinessUseCase,
      getBusinessesUseCase,
      getOneBusinessUseCase,
      softDeleteUseCase,
    },
  };
};
