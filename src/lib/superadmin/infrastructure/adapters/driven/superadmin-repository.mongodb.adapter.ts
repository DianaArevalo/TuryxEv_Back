import { ISuperAdminDocument, SuperAdminSchema } from '../../schemas';

import { Hasher } from '~/lib/shared/infrastructure';
import {
  SuperAdmin,
  SuperAdminCanBlockAccounts,
  SuperAdminCanCreateSuperUsers,
  SuperAdminCanEditBusiness,
  SuperAdminCanEditHotels,
  SuperAdminCanEditUsers,
  SuperAdminCanViewReservations,
  SuperAdminCreatedAt,
  SuperAdminEmail,
  SuperAdminId,
  SuperAdminIsActive,
  SuperAdminLastLogin,
  SuperAdminName,
  SuperAdminNotFoundError,
  SuperAdminPassword,
  SuperAdminRepositoryPort,
  SuperAdminUpdatedAt,
} from '~/lib/superadmin/domain';

export class SuperAdminRepositoryMongoDBAdapter
  implements SuperAdminRepositoryPort
{
  async getAll(): Promise<SuperAdmin[]> {
    const records = await SuperAdminSchema.find();
    return records.map((record) => this.createSuperAdminEntity(record));
  }

  async getAllByIsActive(isActive: SuperAdminIsActive): Promise<SuperAdmin[]> {
    const records = await SuperAdminSchema.find({ isActive: isActive.value });
    return records.map((record) => this.createSuperAdminEntity(record));
  }

  async getOneByEmail(email: SuperAdminEmail): Promise<SuperAdmin | null> {
    const record = await SuperAdminSchema.findOne({ email: email.value });
    return record ? this.createSuperAdminEntity(record) : null;
  }

  async getOneById(id: SuperAdminId): Promise<SuperAdmin | null> {
    const record = await SuperAdminSchema.findOne({ id: id.value });
    return record ? this.createSuperAdminEntity(record) : null;
  }

  async create(superadmin: SuperAdmin): Promise<SuperAdmin> {
    const record = await SuperAdminSchema.create({
      name: superadmin.name.value,
      email: superadmin.email.value,
      password: await Hasher.hash(superadmin.password.value),
      canCreateSuperUser: superadmin.canCreateSuperUser.value,
      canEditUsers: superadmin.canEditUsers.value,
      canViewReservations: superadmin.canViewReservations.value,
      canBlockAccounts: superadmin.canBlockAccounts.value,
      canEditHotels: superadmin.canEditHotels.value,
      canEditBusiness: superadmin.canEditBusiness.value,
      isActive: superadmin.isActive.value,
      createdAt: superadmin.createdAt.value,
      updatedAt: superadmin.updatedAt.value,
      lastLogin: superadmin.lastLogin.value,
    });

    return this.createSuperAdminEntity(record);
  }

  async edit(superadmin: SuperAdmin): Promise<SuperAdmin> {
    const record = await SuperAdminSchema.findOne({
      id: superadmin.superAdminId.value,
    });

    if (!record) throw new SuperAdminNotFoundError();

    record.name = superadmin.name.value;
    record.email = superadmin.email.value;
    record.password = await Hasher.hash(superadmin.password.value);
    record.canCreateSuperUser = superadmin.canCreateSuperUser.value;
    record.canEditUsers = superadmin.canEditUsers.value;
    record.canViewReservations = superadmin.canViewReservations.value;
    record.canBlockAccounts = superadmin.canBlockAccounts.value;
    record.canEditHotels = superadmin.canEditHotels.value;
    record.canEditBusiness = superadmin.canEditBusiness.value;
    record.lastLogin = superadmin.lastLogin.value;

    await record.save();
    return this.createSuperAdminEntity(record);
  }

  async softDelete(id: SuperAdminId): Promise<void> {
    await SuperAdminSchema.updateOne({ _id: id.value }, { isActive: false });
  }

  private createSuperAdminEntity(record: ISuperAdminDocument): SuperAdmin {
    return new SuperAdmin({
      superAdminId: new SuperAdminId(String(record._id)),
      name: new SuperAdminName(record.name),
      email: new SuperAdminEmail(record.email),
      password: new SuperAdminPassword(record.password),
      canCreateSuperUser: new SuperAdminCanCreateSuperUsers(
        record.canCreateSuperUser,
      ),
      canEditUsers: new SuperAdminCanEditUsers(record.canEditUsers),
      canViewReservations: new SuperAdminCanViewReservations(
        record.canViewReservations,
      ),
      canBlockAccounts: new SuperAdminCanBlockAccounts(record.canBlockAccounts),
      canEditHotels: new SuperAdminCanEditHotels(record.canEditHotels),
      canEditBusiness: new SuperAdminCanEditBusiness(record.canEditBusiness),
      isActive: new SuperAdminIsActive(record.isActive),
      createdAt: new SuperAdminCreatedAt(record.createdAt),
      updatedAt: new SuperAdminUpdatedAt(record.updatedAt),
      lastLogin: new SuperAdminLastLogin(record.lastLogin),
    });
  }
}
