import { BusinessCreatedAt } from "./value-objects/business-created-at";
import { BusinessEmail } from "./value-objects/business-email";
import { BusinessId } from "./value-objects/business-id";
import { BusinessLocation } from "./value-objects/business-location";
import { BusinessName } from "./value-objects/business-name";
import { BusinessPassword } from "./value-objects/business-password";
import { BusinessPicture } from "./value-objects/business-picture";
import { BusinessScore } from "./value-objects/business-score";
import { BusinessUpdatedAt } from "./value-objects/business-updated-at";

export interface BusinessI {
  bussinessId: BusinessId;
  name: BusinessName;
  email: BusinessEmail;
  password?: BusinessPassword;
  location?: BusinessLocation;
  picture?: BusinessPicture;
  score?: BusinessScore;
  createdAt: BusinessCreatedAt;
  updatedAt: BusinessUpdatedAt;
  idRole;
  idPlan;
  status;
  providerData;
}

export class Business implements BusinessI {}
