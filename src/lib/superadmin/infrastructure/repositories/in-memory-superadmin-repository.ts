import {
  SuperAdmin,
  SuperAdminEmail,
  SuperAdminId,
  SuperAdminIsActive,
  SuperAdminNotFoundError,
  SuperAdminRepository,
} from '../../domain';

export class InMemorySuperAdminRepository implements SuperAdminRepository {
  superadmins: SuperAdmin[] = [];

  getAll(): Promise<SuperAdmin[]> {
    return Promise.resolve(this.superadmins);
  }

  getAllByIsActive(isActive: SuperAdminIsActive): Promise<SuperAdmin[]> {
    return Promise.resolve(
      this.superadmins.filter((s) => s.isActive.value === isActive.value),
    );
  }

  getOneByEmail(email: SuperAdminEmail): Promise<SuperAdmin | null> {
    return Promise.resolve(
      this.superadmins.find((s) => s.email.value === email.value) || null,
    );
  }

  getOneById(id: SuperAdminId): Promise<SuperAdmin | null> {
    return Promise.resolve(
      this.superadmins.find((s) => s.superAdminId.value === id.value) || null,
    );
  }

  create(superadmin: SuperAdmin): Promise<SuperAdmin> {
    // Solo para pasar el tests de creación de SuperAdmin entity
    const newSuperAdmin = new SuperAdmin({
      superAdminId: new SuperAdminId(superadmin.name.value),
      name: superadmin.name,
      email: superadmin.email,
      password: superadmin.password,
      canCreateSuperUser: superadmin.canCreateSuperUser,
      canEditUsers: superadmin.canEditUsers,
      canViewReservations: superadmin.canViewReservations,
      canBlockAccounts: superadmin.canBlockAccounts,
      canEditHotels: superadmin.canEditHotels,
      canEditBusiness: superadmin.canEditBusiness,
      isActive: superadmin.isActive,
      createdAt: superadmin.createdAt,
      updatedAt: superadmin.updatedAt,
      lastLogin: superadmin.lastLogin,
    });

    this.superadmins.push(newSuperAdmin);

    return Promise.resolve(newSuperAdmin);
  }

  edit(superadmin: SuperAdmin): Promise<SuperAdmin> {
    const index = this.superadmins.findIndex(
      (s) => s.superAdminId.value === superadmin.superAdminId.value,
    );

    if (index === -1) throw new SuperAdminNotFoundError();

    this.superadmins[index] = superadmin;

    return Promise.resolve(superadmin);
  }

  softDelete(id: SuperAdminId): Promise<void> {
    const index = this.superadmins.findIndex(
      (s) => s.superAdminId.value === id.value,
    );

    if (index === -1) throw new SuperAdminNotFoundError();

    this.superadmins[index].isActive = new SuperAdminIsActive(false);
    return Promise.resolve();
  }
}
