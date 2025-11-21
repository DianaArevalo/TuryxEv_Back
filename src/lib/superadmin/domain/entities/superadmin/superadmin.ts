import {
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
  SuperAdminPassword,
  SuperAdminUpdatedAt,
} from './value-objects';

interface SuperAdminI {
  superAdminId: SuperAdminId;
  name: SuperAdminName;
  email: SuperAdminEmail;
  password: SuperAdminPassword;
  canCreateSuperUser?: SuperAdminCanCreateSuperUsers;
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

export interface SuperAdminResponse {
  superAdminId: string;
  name: string;
  email: string;
  password: string;
  permissions: {
    canCreateSuperUser: boolean;
    canEditUsers: boolean;
    canViewReservations: boolean;
    canBlockAccounts: boolean;
    canEditHotels: boolean;
    canEditBusiness: boolean;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | undefined;
}

export class SuperAdmin {
  superAdminId: SuperAdminId;
  name: SuperAdminName;
  email: SuperAdminEmail;
  password: SuperAdminPassword;
  canCreateSuperUser: SuperAdminCanCreateSuperUsers;
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
    this.canCreateSuperUser = attr.canCreateSuperUser
      ? attr.canCreateSuperUser
      : new SuperAdminCanCreateSuperUsers(false);
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

  toResponse(): SuperAdminResponse {
    return {
      superAdminId: this.superAdminId.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      permissions: {
        canCreateSuperUser: this.canCreateSuperUser.value,
        canEditUsers: this.canEditUsers.value,
        canViewReservations: this.canViewReservations.value,
        canBlockAccounts: this.canBlockAccounts.value,
        canEditHotels: this.canEditHotels.value,
        canEditBusiness: this.canEditBusiness.value,
      },
      isActive: this.isActive.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
      lastLogin: this.lastLogin.value,
    };
  }
}
