import { UserRepositoryMongoDBAdapter } from './adapters';
import { buildUserControllers } from './controllers';

const userComposition = () => {
  const userRepository = new UserRepositoryMongoDBAdapter();

  const { controllers } = buildUserControllers(userRepository);

  return {
    controllers,
  };
};

export const { controllers } = userComposition();
