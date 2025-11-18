import {
  ReservationRepositoryPort,
  ReservationResponse,
} from '~/lib/reservation/domain';
import { CreateReservationUseCase } from '../create-reservation/create-reservation';
import { ReservationRepositoryInMemoryAdapter } from '~/lib/reservation/infrastructure/adapters';
import { EditReservationUseCase } from './edit-reservation';
import { HttpError } from '~/lib/Shared/domain';

describe('Edit reservation - Use Case', () => {
  let repository: ReservationRepositoryPort;
  let create: CreateReservationUseCase;
  let edit: EditReservationUseCase;
  let reservationCreated: ReservationResponse;

  const checkInDate = new Date(Date.now() + 9999999);
  const checkOutDate = new Date(checkInDate.getTime() + 9999999);

  beforeEach(async () => {
    repository = new ReservationRepositoryInMemoryAdapter();
    create = new CreateReservationUseCase(repository);
    edit = new EditReservationUseCase(repository);

    reservationCreated = await create.execute({
      hotelId: 'hotel-id',
      userId: 'user-id',
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    });
  });

  it('should edit reservation', async () => {
    const checkInDate = new Date(Date.now() + 1111111);
    const checkOutDate = new Date(checkInDate.getTime() + 1111111);

    const result = await edit.execute({
      reservationId: reservationCreated.reservationId,
      checkInDate,
      checkOutDate,
    });

    expect(result).toBeTruthy();
    expect(result?.checkInDate).toBe(checkInDate);
    expect(result?.checkOutDate).toBe(checkOutDate);
  });

  it('should edit reservation when checkOut is nott porovided', async () => {
    const checkInDate = new Date(Date.now() + 1111111);

    const result = await edit.execute({
      reservationId: reservationCreated.reservationId,
      checkInDate,
    });

    expect(result).toBeTruthy();
    expect(result?.checkInDate).toBe(checkInDate);
  });

  it('should return null when data not provided', async () => {
    const result = await edit.execute({
      reservationId: reservationCreated.reservationId,
    });

    expect(result).toBe(null);
  });

  it('should throw an error when data not change', async () => {
    const result = await edit.execute({
      reservationId: reservationCreated.reservationId,
      checkInDate,
      checkOutDate,
    });

    expect(result).toBe(null);
  });

  it('should throw an error when reservation not found', async () => {
    const checkInDate = new Date(Date.now() + 1111111);
    const checkOutDate = new Date(checkInDate.getTime() + 1111111);

    await expect(
      edit.execute({
        reservationId: 'xxxxxx',
        checkInDate,
        checkOutDate,
      }),
    ).rejects.toThrow(HttpError);
  });

  it('should throw an error when checkinDate is provided and is after checkOutDate', async () => {
    const checkInDate = new Date(Date.now() + 99999999999);

    await expect(
      edit.execute({
        reservationId: reservationCreated.reservationId,
        checkInDate,
      }),
    ).rejects.toThrow(HttpError);
  });
});
