import {
  SuperAdminBusinessServiceAdapter,
  SuperAdminHotelServiceAdapter,
  SuperAdminRepositoryMongoDBAdapter,
  SuperAdminReservationServiceAdapter,
} from './adapters';
import { buildSuperAdminControllers } from './controllers/express/superadmin.controller-factory';

import { businessService } from '~/lib/business/infrastructure/business.composition';
import { hotelService } from '~/lib/hotel/infrastructure/hotel.composition';
import { reservationService } from '~/lib/reservation/infrastructure/reservation.composition';

const superAdminComposition = () => {
  const superAdminRepository = new SuperAdminRepositoryMongoDBAdapter();

  const superAdminBusinessService = new SuperAdminBusinessServiceAdapter(
    businessService,
  );

  const superAdminHotelService = new SuperAdminHotelServiceAdapter(
    hotelService,
  );

  const superAdminReservationService = new SuperAdminReservationServiceAdapter(
    reservationService,
  );

  const { controllers } = buildSuperAdminControllers(
    superAdminRepository,
    superAdminBusinessService,
    superAdminHotelService,
    superAdminReservationService,
  );

  return { controllers };
};

export const { controllers } = superAdminComposition();
