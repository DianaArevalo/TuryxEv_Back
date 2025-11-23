import {
  UserCreatedAt,
  UserEmail,
  UserId,
  UserName,
  UserPassword,
  UserPicture,
  UserPlan,
  UserPlanT,
  UserProviderData,
  UserProviderDataT,
  UserRole,
  UserRoleT,
  UserScore,
  UserStatus,
  UserUpdatedAt,
} from './value-objects';

import { HotelId } from '~/lib/hotel/domain';

export interface UserI {
  idUser?: UserId;
  name: UserName;
  email: UserEmail;
  password?: UserPassword;
  picture?: UserPicture;
  plan: UserPlan;
  role: UserRole;
  score?: UserScore;
  providerData: UserProviderData;
  status?: UserStatus;
  createdAt: UserCreatedAt;
  updatedAt: UserUpdatedAt;
}

export interface UserResponse {
  idUser: string;
  name: string;
  email: string;
  picture: string | undefined;
  plan: UserPlanT;
  role: UserRoleT;
  score: number;
  providerData: UserProviderDataT;
  status: boolean;
}

export class User implements UserI {
  idUser: UserId;
  name: UserName;
  email: UserEmail;
  password?: UserPassword;
  picture?: UserPicture;
  plan: UserPlan;
  role: UserRole;
  score: UserScore;
  providerData: UserProviderData;
  status: UserStatus;
  createdAt: UserCreatedAt;
  updatedAt: UserUpdatedAt;

  constructor(attr: UserI) {
    this.idUser = attr.idUser ? attr.idUser : new HotelId('');
    this.name = attr.name;
    this.email = attr.email;
    this.password = attr.password;
    this.picture = attr.picture;
    this.plan = attr.plan;
    this.role = attr.role;
    this.score = attr.score ? attr.score : new UserScore(1);
    this.providerData = attr.providerData;
    this.status = attr.status ?? new UserStatus(true);
    this.createdAt = attr.createdAt;
    this.updatedAt = attr.updatedAt;
  }

  toResponse(): UserResponse {
    return {
      idUser: this.idUser.value,
      name: this.name.value,
      email: this.email.value,
      picture: this.picture?.value,
      plan: this.plan.value,
      role: this.role.value,
      score: this.score.value,
      providerData: this.providerData.value,
      status: this.status?.value,
    };
  }
}
