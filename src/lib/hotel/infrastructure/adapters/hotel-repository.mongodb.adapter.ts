import {
  Hotel,
  HotelCreatedAt,
  HotelEmail,
  HotelId,
  HotelName,
  HotelNotFoundError,
  HotelPicture,
  HotelPlan,
  HotelProviderData,
  HotelRepositoryPort,
  HotelRole,
  HotelScore,
  HotelStatus,
  HotelUpdatedAt,
  LocationServicePort,
} from '../../domain';
import { HotelSchema, IHotelDocument } from '../schemas/hotel.mongodb.schema';

import {
  PageValueObject,
  LimitValueObject,
  IdValueObject,
} from '~/lib/shared/domain';
import { mongoose as mg, Hasher } from '~/lib/shared/infrastructure';

export class HotelRepositoryMongoDBAdapter implements HotelRepositoryPort {
  constructor(private readonly locationService: LocationServicePort) {}

  async getAll(
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Hotel[]> {
    const offSet = (page.value - 1) * limit.value;

    const records = await HotelSchema.find({
      status: { $ne: new HotelStatus('BLOCKED').toPrimitives() },
    })
      .skip(offSet)
      .limit(limit.value);

    return Promise.all(records.map((record) => this.createHotelEntity(record)));
  }

  async getOneByEmail(email: HotelEmail): Promise<Hotel | null> {
    const record = await HotelSchema.findOne({
      email: email.value,
    });

    if (!record) return null;

    return this.createHotelEntity(record);
  }

  async getOneById(id: HotelId): Promise<Hotel | null> {
    const record = await HotelSchema.findOne({ _id: id.value });

    if (!record) return null;

    return this.createHotelEntity(record);
  }

  async create(hotel: Hotel): Promise<Hotel> {
    const created = await HotelSchema.create({
      name: hotel.name.value,
      email: hotel.email.value,
      password: hotel.password
        ? await Hasher.hash(hotel.password.value)
        : undefined,
      location: hotel.location?.value.locationId,
      picture: hotel.picture ? hotel.picture.value : undefined,
      score: hotel.score.value,
      idRole: hotel.role.toPrimitives(),
      idPlan: hotel.plan.toPrimitives(),
      status: hotel.status.toPrimitives(),
      providerData: hotel.providerData.toPrimitives(),
    });

    console.log('Creating Hotel with values:', {
      idRole: hotel.role.toPrimitives(),
      idPlan: hotel.plan.toPrimitives(),
      status: hotel.status.toPrimitives(),
      providerData: hotel.providerData.toPrimitives(),
    });

    return this.createHotelEntity(created);
  }

  async edit(hotel: Hotel): Promise<Hotel> {
    const record = await HotelSchema.findOne({
      _id: hotel.hotelId?.value,
    });

    if (!record) throw new HotelNotFoundError();

    record.name = hotel.name.value;
    record.password = hotel.password
      ? await Hasher.hash(hotel.password.value)
      : undefined;
    record.location = new mg.Types.ObjectId(hotel.location?.value.locationId);
    record.plan = hotel.plan.toPrimitives();
    record.score = hotel.score.value;
    record.status = hotel.status.toPrimitives();
    record.picture = hotel.picture?.value;

    await record.save();

    return this.createHotelEntity(record);
  }

  async updateStatus(id: HotelId, status: HotelStatus): Promise<void> {
    await HotelSchema.updateOne(
      { _id: id.value },
      { status: HotelStatus.create(status.value).toPrimitives() },
    );
  }

  async getByPlan(
    plan: HotelPlan,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Hotel[]> {
    const offSet = (page.value - 1) * limit.value;

    const records = await HotelSchema.find({
      idPlan: plan.toPrimitives(),
    })
      .skip(offSet)
      .limit(limit.value);

    return Promise.all(records.map((record) => this.createHotelEntity(record)));
  }

  async getByRole(
    role: HotelRole,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Hotel[]> {
    const offSet = (page.value - 1) * limit.value;

    const records = await HotelSchema.find({
      idRole: role.toPrimitives(),
    })
      .skip(offSet)
      .limit(limit.value);

    return Promise.all(records.map((record) => this.createHotelEntity(record)));
  }

  async getByStatus(
    status: HotelStatus,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Hotel[]> {
    const offSet = (page.value - 1) * limit.value;

    const records = await HotelSchema.find({
      status: status.toPrimitives(),
    })
      .skip(offSet)
      .limit(limit.value);

    return Promise.all(records.map((record) => this.createHotelEntity(record)));
  }

  async getByProvider(
    provider: HotelProviderData,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Hotel[]> {
    const offSet = (page.value - 1) * limit.value;

    const records = await HotelSchema.find({
      providerData: provider.toPrimitives(),
    })
      .skip(offSet)
      .limit(limit.value);

    return Promise.all(records.map((record) => this.createHotelEntity(record)));
  }

  async findExpiredFreePlans(currentDate: Date): Promise<Hotel[]> {
    const records = await HotelSchema.find({
      plan: new HotelPlan('FREE').toPrimitives(),
      freePlanEnd: { $lte: currentDate },
      status: { $ne: 'BLOCKED' },
    });

    return Promise.all(records.map((record) => this.createHotelEntity(record)));
  }

  private async createHotelEntity(record: IHotelDocument): Promise<Hotel> {
    // TODO: Crear un método getLocationsByIds(ids: IdValueObject[]) para disminuir la latencia
    const location = record.location
      ? await this.locationService.getLocationById(
          new IdValueObject(record.location.toString()),
        )
      : undefined;

    return new Hotel({
      hotelId: new HotelId(String(record._id)),
      name: new HotelName(record.name),
      email: new HotelEmail(record.email),
      location,
      picture: record.picture ? new HotelPicture(record.picture) : undefined,
      score: new HotelScore(record.score),
      createdAt: new HotelCreatedAt(record.createdAt),
      updatedAt: new HotelUpdatedAt(record.updatedAt),
      role: HotelRole.fromPrimitives(record.role),
      plan: HotelPlan.fromPrimitives(record.plan),
      status: HotelStatus.fromPrimitives(record.status),
      providerData: HotelProviderData.fromPrimitives(record.providerData),
    });
  }
}
