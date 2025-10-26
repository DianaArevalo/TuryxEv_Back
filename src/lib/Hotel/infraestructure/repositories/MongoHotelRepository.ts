import { Limit } from "../../../../lib/Shared/domain/value-objects/limit";
import { Page } from "../../../../lib/Shared/domain/value-objects/page";
import {
  CityRepository,
  Hotel,
  HotelCreatedAt,
  HotelEmail,
  HotelI,
  HotelId,
  HotelLocation,
  HotelName,
  HotelPlan,
  HotelRepository,
  HotelRole,
  HotelScore,
  HotelStatus,
  HotelUpdatedAt,
  ProviderData,
  ProviderDataT,
} from "../../domain";
import { HotelPicture } from "../../domain/entities/Hotel/value-objects/HotelPicture";
import { FindExpiredPlans } from "../../application/FindExpiredFreePlans/FindExpiredFreePlans";
import HotelModel from "../models/HotelModel";
import { Hasher } from "../../../../lib/Shared/Infraestructure/Hasher";
import { HotelNotFoundError } from "../../domain/exceptions/HotelNotFoundError";

export class MongoHotelRepository implements HotelRepository {
  async getAll(page: Page, limit: Limit): Promise<Hotel[]> {
    const offSet = (page.value - 1) * limit.value;

    const records = await HotelModel.find({
      status: { $ne: new HotelStatus("BLOCKED").toPrimitives() },
    })
      .skip(offSet)
      .limit(limit.value);

    return records.map((record) => this.createHotelEntity(record));
  }

  async getOneByEmail(email: HotelEmail): Promise<Hotel | null> {
    const record = await HotelModel.findOne({
      email: email.value,
     
    });

    if (!record) return null;

    return this.createHotelEntity(record);
  }

  async getOneById(id: HotelId): Promise<Hotel | null> {
    const record = await HotelModel.findOne({
      _id: id.value,
    });

    if (!record) return null;

    return this.createHotelEntity(record);
  }

  async create(hotel: HotelI): Promise<HotelI | Hotel> {
    const created = await HotelModel.create({
      name: hotel.name.value,
      email: hotel.email.value,
      password: hotel.password
        ? await Hasher.hash(hotel.password.value)
        : undefined,
      location: hotel.location ? hotel.location.getValue() : undefined,
      picture: hotel.picture ? hotel.picture.value : undefined,

      score: hotel.score.value,
      idRole: hotel.role.toPrimitives(),
      idPlan: hotel.plan.toPrimitives(),
      status: hotel.status.toPrimitives(),
      providerData: hotel.providerData.toPrimitives(),
    });

    console.log("Creating Hotel with values:", {
      idRole: hotel.role.toPrimitives(),
      idPlan: hotel.plan.toPrimitives(),
      status: hotel.status.toPrimitives(),
      providerData: hotel.providerData.toPrimitives(),
    });

    return this.createHotelEntity(created.toObject());
  }

  async edit(hotel: Hotel): Promise<Hotel | void> {
    const record = await HotelModel.findOne({
      _id: hotel.hotelId,
    }).exec();

    if (!record) throw new HotelNotFoundError();

    record.name = hotel.name.value;
    record.password = hotel.password
      ? await Hasher.hash(hotel.password.value)
      : undefined;
    record.location = hotel.location?.getValue();
    record.idPlan = hotel.plan.toPrimitives();
    record.score = hotel.score.value;
    record.status = hotel.status.toPrimitives();
    record.picture = hotel.picture?.value;

    await record.save();

    return this.createHotelEntity(record);
  }

  async updateStatus(id: HotelId, status: HotelStatus): Promise<void> {
    await HotelModel.updateOne(
      { _id: id.value },
      { status: HotelStatus.create("BLOCKED").toPrimitives() }
    );
  }

  //others

  async getByPlan(plan: HotelPlan, page: Page, limit: Limit): Promise<Hotel[]> {
    const offSet = (page.value - 1) * limit.value;

    const records = await HotelModel.find({
      idPlan: plan.toPrimitives(),
    })
      .skip(offSet)
      .limit(limit.value);

    return records.map((record) => this.createHotelEntity(record));
  }

  async getByRole(role: HotelRole, page: Page, limit: Limit): Promise<Hotel[]> {
    const offSet = (page.value - 1) * limit.value;

    const records = await HotelModel.find({
      idRole: role.toPrimitives(),
    })
      .skip(offSet)
      .limit(limit.value);

    return records.map((record) => this.createHotelEntity(record));
  }

  async getByStatus(
    status: HotelStatus,
    page: Page,
    limit: Limit
  ): Promise<Hotel[]> {
    const offSet = (page.value - 1) * limit.value;

    const records = await HotelModel.find({
      status: status.toPrimitives(),
    })
      .skip(offSet)
      .limit(limit.value);

    return records.map((record) => this.createHotelEntity(record));
  }

  async getByProvider(
    provider: ProviderData,
    page: Page,
    limit: Limit
  ): Promise<Hotel[]> {
    const offSet = (page.value - 1) * limit.value;

    const records = await HotelModel.find({
      providerData: provider.toPrimitives(),
    })
      .skip(offSet)
      .limit(limit.value);

    return records.map((record) => this.createHotelEntity(record));
  }

  async findExpiredFreePlans(now: Date, id: HotelId): Promise<Hotel[]> {
    const records = await HotelModel.find({
      _id: id.value,
      plan: 0,
      expirationDate: { $lte: now },
    });

    return records.map((record) => this.createHotelEntity(record));
  }

  private createHotelEntity(record: any): Hotel {
    return new Hotel({
      hotelId: new HotelId(String(record._id)),
      name: new HotelName(record.name), 
      email: new HotelEmail(record.email),
      location: new HotelLocation(record.location),
      picture: record.picture ? new HotelPicture(record.picture) : undefined,
      score: new HotelScore(record.score),
      createdAt: new HotelCreatedAt(record.createdAt),
      updatedAt: new HotelUpdatedAt(record.updatedAt),
      role:
        typeof record.idRole === "number"
          ? HotelRole.fromPrimitives(record.idRole)
          : HotelRole.create(record.idRole),
      plan:
        typeof record.idPlan === "number"
          ? HotelPlan.fromPrimitives(record.idPlan)
          : HotelPlan.fromPrimitives(record.plan),

      status: HotelStatus.fromPrimitives(record.status),
      providerData: ProviderData.fromPrimitives(record.providerData),
    });
  }
}
