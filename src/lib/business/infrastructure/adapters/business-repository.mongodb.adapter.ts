import {
  Business,
  BusinessCreatedAt,
  BusinessEmail,
  BusinessId,
  BusinessName,
  BusinessNotFoundError,
  BusinessPicture,
  BusinessPlan,
  BusinessProviderData,
  BusinessRepositoryPort,
  BusinessRole,
  BusinessScore,
  BusinessStatus,
  BusinessUpdatedAt,
  LocationServicePort,
} from '../../domain';
import { BusinessSchema, IBusinessDocument } from '../schemas';

import {
  PageValueObject,
  LimitValueObject,
  IdValueObject,
} from '~/lib/shared/domain';
import { mongoose as mg, Hasher } from '~/lib/shared/infrastructure';

export class BusinessRepositoryMongoAdapter implements BusinessRepositoryPort {
  constructor(private readonly locationService: LocationServicePort) {}

  async getAll(
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Business[]> {
    const offset = (page.value - 1) * limit.value;

    const records = await BusinessSchema.find({
      status: { $ne: new BusinessStatus('BLOCKED').toPrimitives() },
    })
      .skip(offset)
      .limit(limit.value)
      .lean();

    return Promise.all(
      records.map((record) => this.createBusinessEntity(record)),
    );
  }

  async getOneByEmail(email: BusinessEmail): Promise<Business | null> {
    const record = await BusinessSchema.findOne({
      email: email.value,
    });

    if (!record) return null;

    return this.createBusinessEntity(record);
  }

  async getOneById(id: BusinessId): Promise<Business | null> {
    const record = await BusinessSchema.findOne({
      _id: id.value,
    });

    if (!record) return null;

    return this.createBusinessEntity(record);
  }

  async create(business: Business): Promise<Business> {
    const created = await BusinessSchema.create({
      name: business.name.value,
      email: business.email.value,
      password: business.password
        ? await Hasher.hash(business.password.value)
        : undefined,
      location: business.location?.value.locationId,
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
    const record = await BusinessSchema.findOne({
      _id: business.bussinessId.value,
    }).exec();

    if (!record) throw new BusinessNotFoundError();

    record.name = business.name.value;
    record.password = business.password
      ? await Hasher.hash(business.password.value)
      : undefined;
    record.location = new mg.Types.ObjectId(
      business.location?.value.locationId,
    );
    record.plan = business.idPlan.toPrimitives();
    record.score = business.score.value;
    record.status = business.status.toPrimitives();
    record.picture = business.picture?.value;

    await record.save();

    return this.createBusinessEntity(record);
  }

  async softDelete(id: BusinessId): Promise<void> {
    await BusinessSchema.updateOne(
      { _id: id.value },
      { status: new BusinessStatus('BLOCKED').toPrimitives() },
    );
  }

  async getByPlan(
    plan: BusinessPlan,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Business[]> {
    const offset = (page.value - 1) * limit.value;

    const records = await BusinessSchema.find({
      idPlan: plan.toPrimitives(),
    })
      .skip(offset)
      .limit(limit.value);

    return Promise.all(
      records.map((record) => this.createBusinessEntity(record)),
    );
  }

  async getByRole(
    role: BusinessRole,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Business[]> {
    const offset = (page.value - 1) * limit.value;

    const records = await BusinessSchema.find({
      idRole: role.toPrimitives(),
    })
      .skip(offset)
      .limit(limit.value);

    return Promise.all(
      records.map((record) => this.createBusinessEntity(record)),
    );
  }

  async getByStatus(
    status: BusinessStatus,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Business[]> {
    const offset = (page.value - 1) * limit.value;

    const records = await BusinessSchema.find({
      status: status.toPrimitives(),
    })
      .skip(offset)
      .limit(limit.value);

    return Promise.all(
      records.map((record) => this.createBusinessEntity(record)),
    );
  }

  async getByProvider(
    providerData: BusinessProviderData,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Business[]> {
    const offset = (page.value - 1) * limit.value;

    const records = await BusinessSchema.find({
      providerData: providerData.toPrimitives(),
    })
      .skip(offset)
      .limit(limit.value);

    return Promise.all(
      records.map((record) => this.createBusinessEntity(record)),
    );
  }

  private async createBusinessEntity(
    record: IBusinessDocument,
  ): Promise<Business> {
    // TODO: Crear un método getLocationsByIds(ids: IdValueObject[]) para disminuir la latencia
    const location = record.location
      ? await this.locationService.getLocationById(
          new IdValueObject(record.location.toString()),
        )
      : undefined;

    return new Business({
      bussinessId: new BusinessId(String(record._id)),
      name: new BusinessName(record.name),
      email: new BusinessEmail(record.email),
      location,
      picture: record.picture ? new BusinessPicture(record.picture) : undefined,
      score: new BusinessScore(record.score),
      createdAt: new BusinessCreatedAt(record.createdAt),
      updatedAt: new BusinessUpdatedAt(record.updatedAt),
      idRole: BusinessRole.fromPrimitives(record.role),
      idPlan: BusinessPlan.fromPrimitives(record.plan),
      status: BusinessStatus.fromPrimitives(record.status),
      providerData: BusinessProviderData.fromPrimitives(record.providerData),
    });
  }
}
