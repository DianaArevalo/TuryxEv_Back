import {
  BusinessRepository,
  LocationRepository,
} from '../../../../business/domain';
import { EditBusinessAdapter } from '../../../../business/infrastructure/adapters/driver/edit-business-adapter';
import { EditBusinessProps, ForBusinessEdit } from '../../../domain';

export class ForBusinessEditAdapter implements ForBusinessEdit {
  editBusiness: EditBusinessAdapter;

  constructor(
    private readonly businessRepository: BusinessRepository,
    private readonly locationRepository: LocationRepository,
  ) {
    this.editBusiness = new EditBusinessAdapter(
      this.businessRepository,
      this.locationRepository,
    );
  }

  async edit(props: EditBusinessProps): Promise<void> {
    await this.editBusiness.edit(props);
  }
}
