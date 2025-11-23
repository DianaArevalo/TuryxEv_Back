import { UseCase } from '~/lib/shared/application';
import {
  SuperAdminCanBlockAccounts,
  SuperAdminCanCreateSuperUsers,
  SuperAdminCanEditBusiness,
  SuperAdminCanEditHotels,
  SuperAdminCanEditUsers,
  SuperAdminCanViewReservations,
  SuperAdminEmail,
  SuperAdminId,
  SuperAdminLastLogin,
  SuperAdminName,
  SuperAdminNotFoundError,
  SuperAdminPassword,
  SuperAdminRepositoryPort,
  SuperAdminResponse,
} from '~/lib/superadmin/domain';

export interface EditSuperAdminDTO {
  superAdminId: string;
  name?: string;
  email?: string;
  password?: string;
  canCreateSuperUser?: boolean;
  canEditUsers?: boolean;
  canViewReservations?: boolean;
  canBlockAccounts?: boolean;
  canEditHotels?: boolean;
  canEditBusiness?: boolean;
  lastLogin?: Date;
}

export class EditSuperAdminUseCase
  implements UseCase<EditSuperAdminDTO, SuperAdminResponse>
{
  constructor(private readonly repository: SuperAdminRepositoryPort) {}

  async execute(props: EditSuperAdminDTO): Promise<SuperAdminResponse> {
    const record = await this.repository.getOneById(
      new SuperAdminId(props.superAdminId),
    );

    if (!record) throw new SuperAdminNotFoundError();

    if (props.name) record.name = new SuperAdminName(props.name);
    if (props.email) record.email = new SuperAdminEmail(props.email);
    if (props.password)
      record.password = new SuperAdminPassword(props.password);
    if (props.canCreateSuperUser)
      record.canCreateSuperUser = new SuperAdminCanCreateSuperUsers(
        props.canCreateSuperUser,
      );
    if (props.canEditUsers)
      record.canEditUsers = new SuperAdminCanEditUsers(props.canEditUsers);
    if (props.canViewReservations)
      record.canViewReservations = new SuperAdminCanViewReservations(
        props.canViewReservations,
      );
    if (props.canBlockAccounts)
      record.canBlockAccounts = new SuperAdminCanBlockAccounts(
        props.canBlockAccounts,
      );
    if (props.canEditHotels)
      record.canEditHotels = new SuperAdminCanEditHotels(props.canEditHotels);
    if (props.canEditBusiness)
      record.canEditBusiness = new SuperAdminCanEditBusiness(
        props.canEditBusiness,
      );
    if (props.lastLogin)
      record.lastLogin = new SuperAdminLastLogin(props.lastLogin);

    const edited = await this.repository.edit(record);

    return edited.toResponse();
  }
}
