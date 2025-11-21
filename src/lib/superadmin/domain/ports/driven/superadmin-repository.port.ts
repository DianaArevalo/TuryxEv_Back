import {
  SuperAdmin,
  SuperAdminEmail,
  SuperAdminId,
  SuperAdminIsActive,
} from '../../entities';

export interface SuperAdminRepositoryPort {
  getAll(): Promise<SuperAdmin[]>;
  getAllByIsActive(isActive: SuperAdminIsActive): Promise<SuperAdmin[]>;
  getOneByEmail(email: SuperAdminEmail): Promise<SuperAdmin | null>;
  getOneById(id: SuperAdminId): Promise<SuperAdmin | null>;
  create(superadmin: SuperAdmin): Promise<SuperAdmin>;
  edit(superadmin: SuperAdmin): Promise<SuperAdmin>;
  softDelete(id: SuperAdminId): Promise<void>;
}
