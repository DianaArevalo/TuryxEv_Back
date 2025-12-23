import { PageValueObject, LimitValueObject } from '~/lib/Shared/domain';
import {
  Business,
  BusinessCreatedAt,
  BusinessEmail,
  BusinessId,  
  BusinessName,
  BusinessPicture,
  BusinessPlan,
  BusinessProviderData,
  BusinessRepositoryPort,
  BusinessRole,
  BusinessScore,
  BusinessStatus,
  BusinessUpdatedAt,
} from '../../domain';
import { BusinessSchema } from '../schemas';
import { LocationId } from '../../../../lib/location/domain';
import { Types } from 'mongoose';

export class BusinessRepositoryMongoAdapter implements BusinessRepositoryPort {
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

    return records.map((record) => this.createBusinessEntity(record));
  }

  getOneByEmail(email: BusinessEmail): Promise<Business | null> {
    throw new Error('Method not implemented.');
  }

  getOneById(id: BusinessId): Promise<Business | null> {
    throw new Error('Method not implemented.');
  }

 async create(business: Business): Promise<Business> {

  
  // 1. Guardar en Mongo
  const doc = await BusinessSchema.create({
    name: business.name.value,
    email: business.email.value,
    password: business.password?.value,
    picture: business.picture?.value,
    score: business.score.value,
    createdAt: business.createdAt.value,
    updatedAt: business.updatedAt.value,
    role: business.idRole.toPrimitives(),
    plan: business.idPlan.toPrimitives(),
    status: business.status.toPrimitives(),
    providerData: business.providerData.toPrimitives(),
    location: business.locationId?.value,
  });

  const id = (doc._id as Types.ObjectId).toString();


  // 2. Reconstruir la entidad con el ID real
  return new Business({
    bussinessId: new BusinessId(id),
    name: new BusinessName(doc.name),
    email: new BusinessEmail(doc.email),
    locationId: new LocationId((doc.location as Types.ObjectId).toString()),      
    picture: doc.picture ? new BusinessPicture(doc.picture) : undefined,
    score: new BusinessScore(doc.score),
    createdAt: new BusinessCreatedAt(doc.createdAt),
    updatedAt: new BusinessUpdatedAt(doc.updatedAt),
    idRole: BusinessRole.fromPrimitives(doc.role),
    idPlan: BusinessPlan.fromPrimitives(doc.plan),
    status: BusinessStatus.fromPrimitives(doc.status),
    providerData: BusinessProviderData.fromPrimitives(doc.providerData),
  });
}


  edit(business: Business): Promise<Business> {
    throw new Error('Method not implemented.');
  }

  softDelete(id: BusinessId): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getByPlan(
    plan: BusinessPlan,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Business[]> {
    throw new Error('Method not implemented.');
  }

  getByRole(
    role: BusinessRole,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Business[]> {
    throw new Error('Method not implemented.');
  }

  getByStatus(
    status: BusinessStatus,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Business[]> {
    throw new Error('Method not implemented.');
  }

  getByProvider(
    providerData: BusinessProviderData,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Business[]> {
    throw new Error('Method not implemented.');
  }

  private createBusinessEntity(record: any): Business {
    return new Business({
      bussinessId: new BusinessId(String(record._id)),
      name: new BusinessName(record.name),
      email: new BusinessEmail(record.email),
      locationId: new LocationId(record.location), 
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
