import { BlockHotelController } from './block-hotel.controller';
import { CheckHotelFreePlansController } from './check-hotel-free-plans.controller';
import { CreateHotelController } from './create-hotel.controller';
import { EditHotelController } from './edit-hotel.controller';
import { GetHotelsController } from './get-hotels.controller';
import { GetOneHotelController } from './get-one-hotel.controller';

import {
  BlockHotelUseCase,
  CheckHotelFreePlansUseCase,
  CreateHotelUseCase,
  EditHotelUseCase,
  GetHotelsUseCase,
  GetOneHotelUseCase,
} from '~/lib/hotel/application';
import { HotelRepositoryPort, LocationServicePort } from '~/lib/hotel/domain';

export const buildHotelControllers = (
  hotelRepository: HotelRepositoryPort,
  locationService: LocationServicePort,
) => {
  const blockHotelUseCase = new BlockHotelUseCase(hotelRepository);
  const blockHotelController = new BlockHotelController(blockHotelUseCase);

  const checkHotelFreePlansUseCase = new CheckHotelFreePlansUseCase(
    hotelRepository,
  );
  const checkHotelFreePlansController = new CheckHotelFreePlansController(
    checkHotelFreePlansUseCase,
  );

  const createHotelUseCase = new CreateHotelUseCase(
    hotelRepository,
    locationService,
  );
  const createHotelController = new CreateHotelController(createHotelUseCase);

  const editHotelUseCase = new EditHotelUseCase(
    hotelRepository,
    locationService,
  );
  const editHotelController = new EditHotelController(editHotelUseCase);

  const getHotelsUseCase = new GetHotelsUseCase(hotelRepository);
  const getHotelsController = new GetHotelsController(getHotelsUseCase);

  const getOneHotelUseCase = new GetOneHotelUseCase(hotelRepository);
  const getOneHotelController = new GetOneHotelController(getOneHotelUseCase);

  return {
    controllers: {
      blockHotelController,
      checkHotelFreePlansController,
      createHotelController,
      editHotelController,
      getHotelsController,
      getOneHotelController,
    },
    useCases: {
      blockHotelUseCase,
      checkHotelFreePlansUseCase,
      createHotelUseCase,
      editHotelUseCase,
      getHotelsUseCase,
      getOneHotelUseCase,
    },
  };
};
