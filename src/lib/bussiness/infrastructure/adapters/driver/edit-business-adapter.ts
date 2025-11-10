import { EditBusiness } from '../../../application';
import {
  BusinessRepository,
  EditBusinessProps,
  ForEditBusiness,
  LocationRepository,
} from '../../../domain';

export class EditBusinessAdapter implements ForEditBusiness {
  constructor(
    private readonly repository: BusinessRepository,
    private readonly locationRepository: LocationRepository,
  ) {}

  async edit(props: EditBusinessProps): Promise<void> {
    const edit = new EditBusiness(this.repository, this.locationRepository);
    await edit.handler(props);
  }
}
