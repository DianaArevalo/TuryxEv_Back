import {
  BusinessCreatedAt,
  BusinessEmail,
  BusinessId,
  BusinessLocation,
  BusinessName,
  BusinessPassword,
  BusinessPicture,
  BusinessPlan,
  BusinessProviderData,
  BusinessRole,
  BusinessScore,
  BusinessStatus,
  BusinessUpdatedAt,
} from './value-objects';

export interface BusinessI {
  bussinessId: BusinessId;
  name: BusinessName;
  email: BusinessEmail;
  password?: BusinessPassword;
  location?: BusinessLocation;
  picture?: BusinessPicture;
  score: BusinessScore;
  createdAt: BusinessCreatedAt;
  updatedAt: BusinessUpdatedAt;
  idRole: BusinessRole;
  idPlan: BusinessPlan;
  status: BusinessStatus;
  providerData: BusinessProviderData;
}

export class Business implements BusinessI {
  bussinessId: BusinessId;
  name: BusinessName;
  email: BusinessEmail;
  password?: BusinessPassword;
  location?: BusinessLocation;
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
    this.location = attr.location;
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
  toPrivateResponse() {
    return {
      bussinessId: this.bussinessId.value,
      name: this.name.value,
      email: this.email.value,
      location: this.location?.value,
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
  toPublicResponse() {
    return {
      bussinessId: this.bussinessId.value,
      name: this.name.value,
      email: this.email.value,
      location: this.location?.value,
      picture: this.picture?.value,
      score: this.score?.value,
      status: this.status?.value,
    };
  }
}
