import { LocationId } from "~/lib/location/domain";
import {
  Business,
} from "./business";

import {
  BusinessId,
  BusinessName,
  BusinessEmail,
  BusinessPassword,
  BusinessPicture,
  BusinessPlan,  
  BusinessProviderData,
  BusinessRole,
  BusinessScore,
  BusinessStatus,
  BusinessCreatedAt,
  BusinessUpdatedAt,
} from "./value-objects";

describe("Business - Domain Entity", () => {
  let businessIdVO: BusinessId;
  let nameVO: BusinessName;
  let emailVO: BusinessEmail;
  let passwordVO: BusinessPassword;
  let locationIdVO: LocationId;
  let pictureVO: BusinessPicture;
  let scoreVO: BusinessScore;
  let createdAtVO: BusinessCreatedAt;
  let updatedAtVO: BusinessUpdatedAt;
  let roleVO: BusinessRole;
  let planVO: BusinessPlan;
  let statusVO: BusinessStatus;
  let providerDataVO: BusinessProviderData;

  beforeEach(() => {
    businessIdVO = new BusinessId("business-123");
    nameVO = new BusinessName("Hotel Aurora");
    emailVO = new BusinessEmail("contact@aurora.com");
    passwordVO = new BusinessPassword("hashed-password");
    locationIdVO = new LocationId("location-999");
    pictureVO = new BusinessPicture("https://image.com/logo.png");
    scoreVO = new BusinessScore(4.5);
    createdAtVO = new BusinessCreatedAt(new Date("2024-01-01"));
    updatedAtVO = new BusinessUpdatedAt(new Date("2024-01-10"));
    roleVO = new BusinessRole("BUSINESS");
    planVO = new BusinessPlan("FREE");
    statusVO = new BusinessStatus("OPEN");
    providerDataVO = new BusinessProviderData("AUTH");
  });

  it("should create a valid Business entity from value objects", () => {
    const business = new Business({
      bussinessId: businessIdVO,
      name: nameVO,
      email: emailVO,
      password: passwordVO,
      locationId: locationIdVO,
      picture: pictureVO,
      score: scoreVO,
      createdAt: createdAtVO,
      updatedAt: updatedAtVO,
      idRole: roleVO,
      idPlan: planVO,
      status: statusVO,
      providerData: providerDataVO,
    });

    expect(business).toBeInstanceOf(Business);
    expect(business.bussinessId.value).toBe("business-123");
    expect(business.name.value).toBe("Hotel Aurora");
    expect(business.email.value).toBe("contact@aurora.com");
    expect(business.locationId.value).toBe("location-999");
  });

  it("should return a correct private response", () => {
    const business = new Business({
      bussinessId: businessIdVO,
      name: nameVO,
      email: emailVO,
      password: passwordVO,
      locationId: locationIdVO,
      picture: pictureVO,
      score: scoreVO,
      createdAt: createdAtVO,
      updatedAt: updatedAtVO,
      idRole: roleVO,
      idPlan: planVO,
      status: statusVO,
      providerData: providerDataVO,
    });

    const response = business.toPrivateResponse();

    expect(response).toEqual({
      bussinessId: "business-123",
      name: "Hotel Aurora",
      email: "contact@aurora.com",
      locationId: "location-999",
      picture: "https://image.com/logo.png",
      score: 4.5,
      createdAt: createdAtVO.value,
      updatedAt: updatedAtVO.value,
      idRole: "BUSINESS",
      idPlan: "FREE",
      status: "OPEN",
      providerData: providerDataVO.value,
    });
  });

  it("should return a correct public response", () => {
    const business = new Business({
      bussinessId: businessIdVO,
      name: nameVO,
      email: emailVO,
      password: undefined,
      locationId: locationIdVO,
      picture: pictureVO,
      score: scoreVO,
      createdAt: createdAtVO,
      updatedAt: updatedAtVO,
      idRole: roleVO,
      idPlan: planVO,
      status: statusVO,
      providerData: providerDataVO,
    });

    const response = business.toPublicResponse();

    expect(response).toEqual({
      bussinessId: "business-123",
      name: "Hotel Aurora",
      email: "contact@aurora.com",
      locationId: "location-999",
      picture: "https://image.com/logo.png",
      score: 4.5,
      status: "OPEN",
    });
  });

  it("should handle optional fields when they are undefined", () => {
    const business = new Business({
      bussinessId: businessIdVO,
      name: nameVO,
      email: emailVO,
      password: undefined,
      locationId: locationIdVO,
      picture: undefined,
      score: scoreVO,
      createdAt: createdAtVO,
      updatedAt: updatedAtVO,
      idRole: roleVO,
      idPlan: planVO,
      status: statusVO,
      providerData: providerDataVO,
    });

    const response = business.toPublicResponse();

    expect(response.picture).toBeUndefined();
  });

  it("should fail if a value object is invalid (mocking invalid VO)", () => {
    const invalidName = {
      get value() {
        throw new Error("Invalid business name");
      },
    };

    const business = new Business({
      bussinessId: businessIdVO,
      name: invalidName as any,
      email: emailVO,
      password: passwordVO,
      locationId: locationIdVO,
      picture: pictureVO,
      score: scoreVO,
      createdAt: createdAtVO,
      updatedAt: updatedAtVO,
      idRole: roleVO,
      idPlan: planVO,
      status: statusVO,
      providerData: providerDataVO,
    });

    expect(() => business.toPublicResponse()).toThrow("Invalid business name");
  });
});
