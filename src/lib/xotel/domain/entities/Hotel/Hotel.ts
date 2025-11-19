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
} from './value-objects';
import { HotelPicture } from './value-objects/HotelPicture';

export interface HotelI {
  hotelId?: HotelId;
  name: HotelName;
  email: HotelEmail;
  password?: HotelPassword;
  location: HotelLocation;
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

export class Hotel implements HotelI {
  hotelId?: HotelId;
  name: HotelName;
  email: HotelEmail;
  password?: HotelPassword;
  location: HotelLocation;
  picture?: HotelPicture | undefined;
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

  toResponse() {
    return {
      hotelId: this.hotelId?.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password?.value,
      location: this.location.getValue(),
      picture: this.picture?.value,
      plan: this.plan.getValue(),
      role: this.role.getValue(),
      score: this.score.value,
      status: this.status.getValue(),
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
      freePlanEnd: this.freePlanEnd?.getValue(),
      providerData: this.providerData.value,
    };
  }
}
