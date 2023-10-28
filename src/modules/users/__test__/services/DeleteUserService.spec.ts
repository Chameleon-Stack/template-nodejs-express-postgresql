import { v4 as uuidv4 } from 'uuid';
import LibError from '../../../../shared/errors/LibError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../infra/typeorm/entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';
import { UserRepositoryInMemory } from '../../repositories/inMemory/UserRepositoryInMemory';
import { DeleteUserService } from '../../services/DeleteUserService';

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
      new LibError('User does not exists!', 404),
    );
  });
});
