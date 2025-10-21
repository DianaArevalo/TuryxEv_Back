import { Page, Limit } from "../../../Shared/domain";
import {
  Business,
  BusinessCreatedAt,
  BusinessEmail,
  BusinessId,
  BusinessLocation,
  BusinessName,
  BusinessNotFoundError,
  BusinessPicture,
  BusinessPlan,
  BusinessProviderData,
  BusinessRepository,
  BusinessRole,
  BusinessScore,
  BusinessStatus,
  BusinessUpdatedAt,
} from "../../domain";
import BusinessModel from "../models/business-model";
import { Hasher } from "../../../Shared/Infraestructure/Hasher";

export class MongoBusinessRepository implements BusinessRepository {
  async getAll(page: Page, limit: Limit): Promise<Business[]> {
    const offset = (page.value - 1) * limit.value;

    const records = await BusinessModel.find({
      status: { $ne: new BusinessStatus("BLOCKED").toPrimitives() },
    })
      .skip(offset)
      .limit(limit.value);

    return records.map((record) => this.createBusinessEntity(record));
  }

  async getOneByEmail(email: BusinessEmail): Promise<Business | null> {
    const record = await BusinessModel.findOne({
      email: email.value,
    });

    if (!record) return null;

    return this.createBusinessEntity(record);
  }

  async getOneById(id: BusinessId): Promise<Business | null> {
    const record = await BusinessModel.findOne({
      _id: id.value,
    });

    if (!record) return null;

    return this.createBusinessEntity(record);
  }

  async create(business: Business): Promise<Business> {
    const created = await BusinessModel.create({
      name: business.name.value,
      email: business.email.value,
      password: business.password
        ? await Hasher.hash(business.password.value)
        : undefined,
      location: business.location ? business.location.value : undefined,
      picture: business.picture ? business.picture.value : undefined,
      score: business.score.value,
      idRole: business.idRole.toPrimitives(),
      idPlan: business.idPlan.toPrimitives(),
      status: business.status.toPrimitives(),
      providerData: business.providerData.toPrimitives(),
    });

    return this.createBusinessEntity(created);
  }

  async edit(business: Business): Promise<Business> {
    const record = await BusinessModel.findOne({
      _id: business.bussinessId.value,
    }).exec();

    if (!record) throw new BusinessNotFoundError();

    record.name = business.name.value;
    record.password = business.password
      ? await Hasher.hash(business.password.value)
      : undefined;
    record.location = business.location?.value;
    record.idPlan = business.idPlan.toPrimitives();
    record.score = business.score.value;
    record.status = business.status.toPrimitives();
    record.picture = business.picture?.value;

    await record.save();

    return this.createBusinessEntity(record);
  }

  async softDelete(id: BusinessId): Promise<void> {
    await BusinessModel.updateOne(
      { _id: id.value },
      { status: new BusinessStatus("BLOCKED").toPrimitives() }
    );
  }

  async getByPlan(
    plan: BusinessPlan,
    page: Page,
    limit: Limit
  ): Promise<Business[]> {
    const offset = (page.value - 1) * limit.value;

    const records = await BusinessModel.find({
      idPlan: plan.toPrimitives(),
    })
      .skip(offset)
      .limit(limit.value);

    return records.map((record) => this.createBusinessEntity(record));
  }

  async getByRole(
    role: BusinessRole,
    page: Page,
    limit: Limit
  ): Promise<Business[]> {
    const offset = (page.value - 1) * limit.value;

    const records = await BusinessModel.find({
      idRole: role.toPrimitives(),
    })
      .skip(offset)
      .limit(limit.value);

    return records.map((record) => this.createBusinessEntity(record));
  }

  async getByStatus(
    status: BusinessStatus,
    page: Page,
    limit: Limit
  ): Promise<Business[]> {
    const offset = (page.value - 1) * limit.value;

    const records = await BusinessModel.find({
      status: status.toPrimitives(),
    })
      .skip(offset)
      .limit(limit.value);

    return records.map((record) => this.createBusinessEntity(record));
  }

  async getByProvider(
    providerData: BusinessProviderData,
    page: Page,
    limit: Limit
  ): Promise<Business[]> {
    const offset = (page.value - 1) * limit.value;

    const records = await BusinessModel.find({
      providerData: providerData.toPrimitives(),
    })
      .skip(offset)
      .limit(limit.value);

    return records.map((record) => this.createBusinessEntity(record));
  }

  private createBusinessEntity(record: any): Business {
    return new Business({
      bussinessId: new BusinessId(String(record._id)),
      name: new BusinessName(record.name),
      email: new BusinessEmail(record.email),
      location: record.location
        ? new BusinessLocation(record.location)
        : undefined,
      picture: record.picture ? new BusinessPicture(record.picture) : undefined,
      score: new BusinessScore(record.score),
      createdAt: new BusinessCreatedAt(record.createdAt),
      updatedAt: new BusinessUpdatedAt(record.updatedAt),
      idRole: BusinessRole.fromPrimitives(record.idRole),
      idPlan: BusinessPlan.fromPrimitives(record.idPlan),
      status: BusinessStatus.fromPrimitives(record.status),
      providerData: BusinessProviderData.fromPrimitives(record.providerData),
    });
  }
}
