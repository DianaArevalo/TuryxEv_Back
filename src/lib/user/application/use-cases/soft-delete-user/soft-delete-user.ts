import { UseCase } from '~/lib/shared/application';
import { UserRepositoryPort, UserId } from '~/lib/user/domain';

export interface SoftDeleteUserDTO {
  id: string;
}

export class SoftDeleteUserUseCase implements UseCase<SoftDeleteUserDTO, void> {
  constructor(private readonly repository: UserRepositoryPort) {}

  async execute(props: SoftDeleteUserDTO): Promise<void> {
    await this.repository.softDelete(new UserId(props.id));
  }
}
