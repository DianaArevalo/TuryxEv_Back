import { HotelServiceAdapter } from '../application';
import {
  HotelRepositoryMongoDBAdapter,
  LocationServiceAdapter,
} from './adapters';
import { buildHotelControllers } from './controller';

import { locationService as locationHexagon } from '~/lib/location/infrastructure/location.composition';

const hotelComposition = () => {
  const locationService = new LocationServiceAdapter(locationHexagon);
  const hotelRepository = new HotelRepositoryMongoDBAdapter(locationService);

  const {
    controllers,
    useCases: { editHotelUseCase },
  } = buildHotelControllers(hotelRepository, locationService);

  const hotelService = new HotelServiceAdapter({
    editHotelUseCase,
  });

  return { controllers, hotelService };
};

export const { controllers, hotelService } = hotelComposition();
