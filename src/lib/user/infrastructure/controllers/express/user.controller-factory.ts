import { CreateUserController } from './create-user.controller';
import { EditUserController } from './edit-user.controller';
import { GetOneUserController } from './get-one-user.controller';
import { GetUsersController } from './get-users.controller';
import { SoftDeleteUserController } from './soft-delete-user.controller';

import {
  CreateUserUseCase,
  EditUserUseCase,
  GetOneUserUseCase,
  GetUsersUseCase,
  SoftDeleteUserUseCase,
} from '~/lib/user/application';
import { UserRepositoryPort } from '~/lib/user/domain/ports';

export const buildUserControllers = (userRepository: UserRepositoryPort) => {
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const createUserController = new CreateUserController(createUserUseCase);

  const editUserUseCase = new EditUserUseCase(userRepository);
  const editUserController = new EditUserController(editUserUseCase);

  const getOneUserUseCase = new GetOneUserUseCase(userRepository);
  const getOneUserController = new GetOneUserController(getOneUserUseCase);

  const getUsersUseCase = new GetUsersUseCase(userRepository);
  const getUsersController = new GetUsersController(getUsersUseCase);

  const softDeleteUserUseCase = new SoftDeleteUserUseCase(userRepository);
  const softDeleteUserController = new SoftDeleteUserController(
    softDeleteUserUseCase,
  );

  return {
    controllers: {
      createUserController,
      editUserController,
      getOneUserController,
      getUsersController,
      softDeleteUserController,
    },
    useCases: {
      createUserUseCase,
      editUserUseCase,
      getOneUserUseCase,
      getUsersUseCase,
      softDeleteUserUseCase,
    },
  };
};
