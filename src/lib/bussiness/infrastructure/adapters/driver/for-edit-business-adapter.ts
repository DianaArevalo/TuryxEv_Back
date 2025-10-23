import { EditBusiness } from "../../../application";
import { EditBusinessProps, ForEditBusiness } from "../../../domain";
import { MongoBusinessRepository } from "../../repositories/business-mongo-repository";
import { MongoLocationRepository } from "../../repositories/location-mongo-repository";

export class ForEditBusinessAdapter implements ForEditBusiness {
  async edit(props: EditBusinessProps): Promise<void> {
    const repository = new MongoBusinessRepository();
    const locationRepository = new MongoLocationRepository();

    const edit = new EditBusiness(repository, locationRepository);
    await edit.handler(props);
  }
}
