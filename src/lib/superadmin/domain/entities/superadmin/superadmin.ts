import {
  SuperAdminCanBlockAccounts,
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
  SuperAdminPassword,
  SuperAdminUpdatedAt,
} from "./value-objects";

interface SuperAdminI {
  superAdminId: SuperAdminId;
  name: SuperAdminName;
  email: SuperAdminEmail;
  password: SuperAdminPassword;
  canEditUsers?: SuperAdminCanEditUsers;
  canViewReservations?: SuperAdminCanViewReservations;
  canBlockAccounts?: SuperAdminCanBlockAccounts;
  canEditHotels?: SuperAdminCanEditHotels;
  canEditBusiness?: SuperAdminCanEditBusiness;
  isActive?: SuperAdminIsActive;
  createdAt?: SuperAdminCreatedAt;
  updatedAt?: SuperAdminUpdatedAt;
  lastLogin?: SuperAdminLastLogin;
}

export class SuperAdmin {
  superAdminId: SuperAdminId;
  name: SuperAdminName;
  email: SuperAdminEmail;
  password: SuperAdminPassword;
  canEditUsers: SuperAdminCanEditUsers;
  canViewReservations: SuperAdminCanViewReservations;
  canBlockAccounts: SuperAdminCanBlockAccounts;
  canEditHotels: SuperAdminCanEditHotels;
  canEditBusiness: SuperAdminCanEditBusiness;
  isActive: SuperAdminIsActive;
  createdAt: SuperAdminCreatedAt;
  updatedAt: SuperAdminUpdatedAt;
  lastLogin: SuperAdminLastLogin;

  constructor(attr: SuperAdminI) {
    this.superAdminId = attr.superAdminId;
    this.name = attr.name;
    this.email = attr.email;
    this.password = attr.password;
    this.canEditUsers = attr.canEditUsers
      ? attr.canEditUsers
      : new SuperAdminCanEditUsers(false);
    this.canViewReservations = attr.canViewReservations
      ? attr.canViewReservations
      : new SuperAdminCanViewReservations(false);
    this.canBlockAccounts = attr.canBlockAccounts
      ? attr.canBlockAccounts
      : new SuperAdminCanBlockAccounts(false);
    this.canEditHotels = attr.canEditHotels
      ? attr.canEditHotels
      : new SuperAdminCanEditHotels(false);
    this.canEditBusiness = attr.canEditBusiness
      ? attr.canEditBusiness
      : new SuperAdminCanEditBusiness(false);
    this.isActive = attr.isActive
      ? attr.isActive
      : new SuperAdminIsActive(true);
    this.createdAt = attr.createdAt
      ? attr.createdAt
      : SuperAdminCreatedAt.now();
    this.updatedAt = attr.updatedAt
      ? attr.updatedAt
      : SuperAdminUpdatedAt.now(this.createdAt);
    this.lastLogin = attr.lastLogin
      ? attr.lastLogin
      : SuperAdminLastLogin.never();
  }
}
