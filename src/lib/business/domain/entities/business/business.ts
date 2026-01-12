import { LocationId } from "~/lib/location/domain";
import {
  BusinessCreatedAt,
  BusinessEmail,
  BusinessId,
  BusinessLocation,
  BusinessName,
  BusinessPassword,
  BusinessPicture,
  BusinessPlan,
  BusinessPlanT,
  BusinessProviderData,
  BusinessRole,
  BusinessRoleT,
  BusinessScore,
  BusinessStatus,
  BusinessStatusT,
  BusinessUpdatedAt,
} from "./value-objects";

import { ProviderDataT } from '../../../../../lib/Shared/domain';

export interface BusinessI {
  bussinessId: BusinessId;
  name: BusinessName;
  email: BusinessEmail;
  password?: BusinessPassword;
  locationId: LocationId;
  picture?: BusinessPicture;
  score: BusinessScore;
  createdAt: BusinessCreatedAt;
  updatedAt: BusinessUpdatedAt;
  idRole: BusinessRole;
  idPlan: BusinessPlan;
  status: BusinessStatus;
  providerData: BusinessProviderData;
}

export interface BusinessPrivateResponse {
  bussinessId: string;
  name: string;
  email: string;
  locationId: string;
  picture: string | undefined;
  score: number;
  createdAt: Date;
  updatedAt: Date;
  idRole: BusinessRoleT;
  idPlan: BusinessPlanT;
  status: BusinessStatusT;
  providerData: ProviderDataT;
}

export interface BusinessPublicResponse {
  bussinessId: string;
  name: string;
  email: string;
  locationId: string;
  picture: string | undefined;
  score: number;
  status: BusinessStatusT;
}

export class Business implements BusinessI {
  bussinessId: BusinessId;
  name: BusinessName;
  email: BusinessEmail;
  password?: BusinessPassword;
  locationId: LocationId;
  picture?: BusinessPicture;
  score: BusinessScore;
  createdAt: BusinessCreatedAt;
  updatedAt: BusinessUpdatedAt;
  idRole: BusinessRole;
  idPlan: BusinessPlan;
  status: BusinessStatus;
  providerData: BusinessProviderData;

  constructor(attr: BusinessI) {
    this.bussinessId = attr.bussinessId;
    this.name = attr.name;
    this.email = attr.email;
    this.password = attr.password;
    this.locationId = attr.locationId;
    this.picture = attr.picture;
    this.score = attr.score;
    this.createdAt = attr.createdAt;
    this.updatedAt = attr.updatedAt;
    this.idRole = attr.idRole;
    this.idPlan = attr.idPlan;
    this.status = attr.status;
    this.providerData = attr.providerData;
  }

  // Para sí mismos
  toPrivateResponse(): BusinessPrivateResponse {
    return {
      bussinessId: this.bussinessId.value,
      name: this.name.value,
      email: this.email.value,
      locationId: this.locationId.value,
      picture: this.picture?.value,
      score: this.score?.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
      idRole: this.idRole.value,
      idPlan: this.idPlan.value,
      status: this.status?.value,
      providerData: this.providerData.value,
    };
  }

  // Para clientes
  toPublicResponse(): BusinessPublicResponse {
    return {
      bussinessId: this.bussinessId.value,
      name: this.name.value,
      email: this.email.value,
      locationId: this.locationId.value,
      picture: this.picture?.value,
      score: this.score?.value,
      status: this.status?.value,
    };
  }
}
