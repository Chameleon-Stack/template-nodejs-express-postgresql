import { v4 as uuidv4 } from 'uuid';
import { IUserRepository } from '../../src/modules/users/repositories/IUserRepository';
import { DeleteUserService } from '../../src/modules/users/services/DeleteUserService';
import { UserRepositoryInMemory } from '../../src/modules/users/repositories/inMemory/UserRepositoryInMemory';
import { ICreateUserDTO } from '../../src/modules/users/dtos/ICreateUserDTO';
import LibraryError from '../../src/shared/errors/LibError';
import { User } from '../../src/modules/users/infra/typeorm/entities/User';

describe('Delete user service', () => {
  let userRepositoryInMemory: IUserRepository;
  let deleteUserUseCase: DeleteUserService;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    deleteUserUseCase = new DeleteUserService(userRepositoryInMemory);
  });

  it('should be able to delete user', async () => {
    const user: ICreateUserDTO = {
      email: 'example@example.com',
      password: '1234',
      name: 'User test',
    };

    const userCreated = (await userRepositoryInMemory.create(user)) as User;

    await deleteUserUseCase.execute(userCreated.id);
  });

  it('should not be able to delete user does not exists', async () => {
    await expect(deleteUserUseCase.execute(uuidv4())).rejects.toEqual(
      new LibraryError('User does not exists!', 404),
    );
  });
});
