import {
  EditReservationDTO,
  EditReservationUseCase,
} from '~/lib/reservation/application';
import { ReservationResponse } from '~/lib/reservation/domain';
import { ApiResponse } from '~/lib/Shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/Shared/Infraestructure/External';

export class EditReservationController {
  constructor(
    private readonly editReservationUseCase: EditReservationUseCase,
  ) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as EditReservationDTO;

    const result = await this.editReservationUseCase.execute(body);

    const response: ApiResponse<ReservationResponse | null> = result
      ? {
          success: true,
          title: 'Reservation successfully updated.',
          message: `Reservation with ID ${body.reservationId} has been updated.`,
          body: result,
        }
      : {
          success: false,
          title: 'No changes applied.',
          message:
            'No updates were made because no fields were provided or the submitted data matches the current reservation.',
          body: null,
        };

    return res.status(response.success ? 200 : 304).json(response);
  }
}
