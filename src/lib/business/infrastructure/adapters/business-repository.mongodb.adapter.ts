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
    const created = new Business(business);    
    return created;
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
