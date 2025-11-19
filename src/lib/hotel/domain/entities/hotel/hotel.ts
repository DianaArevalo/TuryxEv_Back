import {
  HotelCreatedAt,
  HotelUpdatedAt,
  HotelId,
  HotelName,
  HotelEmail,
  HotelRole,
  HotelScore,
  HotelPassword,
  HotelLocation,
  HotelPlan,
  HotelStatus,
  HotelProviderData,
  HotelFreePlanEnd,
  HotelPicture,
  HotelPlanT,
  HotelRoleT,
} from './value-objects';

import {
  LocationValueObjectI,
  ProviderDataT,
  StatusT,
} from '~/lib/Shared/domain';

export interface HotelI {
  hotelId?: HotelId;
  name: HotelName;
  email: HotelEmail;
  password?: HotelPassword;
  location?: HotelLocation;
  picture?: HotelPicture;
  plan: HotelPlan;
  role: HotelRole;
  score: HotelScore;
  status: HotelStatus;
  createdAt: HotelCreatedAt;
  updatedAt: HotelUpdatedAt;
  freePlanEnd?: HotelFreePlanEnd;
  providerData: HotelProviderData;
}

export interface HotelResponse {
  id: string | undefined;
  name: string;
  email: string;
  password: string | undefined;
  location: LocationValueObjectI | undefined;
  picture: string | undefined;
  plan: HotelPlanT;
  role: HotelRoleT;
  score: number;
  status: StatusT;
  createdAt: Date;
  updatedAt: Date;
  freePlanEnd: Date | undefined;
  providerData: ProviderDataT;
}

export class Hotel implements HotelI {
  hotelId?: HotelId;
  name: HotelName;
  email: HotelEmail;
  password?: HotelPassword;
  location?: HotelLocation;
  picture?: HotelPicture;
  plan: HotelPlan;
  role: HotelRole;
  score: HotelScore;
  status: HotelStatus;
  createdAt: HotelCreatedAt;
  updatedAt: HotelUpdatedAt;
  freePlanEnd?: HotelFreePlanEnd;
  providerData: HotelProviderData;

  constructor(attr: HotelI) {
    this.hotelId = attr.hotelId;
    this.name = attr.name;
    this.email = attr.email;
    this.password = attr.password;
    this.location = attr.location;
    this.picture = attr.picture;
    this.plan = attr.plan;
    this.role = attr.role;
    this.score = attr.score;
    this.status = attr.status;
    this.createdAt = attr.createdAt;
    this.updatedAt = attr.updatedAt;
    this.freePlanEnd = attr.freePlanEnd;
    this.providerData = attr.providerData;
  }

  block() {
    this.status = HotelStatus.create('BLOCKED');
  }

  toResponse(): HotelResponse {
    return {
      id: this.hotelId?.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password?.value,
      location: this.location?.value,
      picture: this.picture?.value,
      plan: this.plan.value,
      role: this.role.value,
      score: this.score.value,
      status: this.status.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
      freePlanEnd: this.freePlanEnd?.value,
      providerData: this.providerData.value,
    };
  }
}
