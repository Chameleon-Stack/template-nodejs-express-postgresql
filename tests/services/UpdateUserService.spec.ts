import { ICreateUserDTO } from '../../src/modules/users/dtos/ICreateUserDTO';
import { User } from '../../src/modules/users/infra/typeorm/entities/User';
import { IUserRepository } from '../../src/modules/users/repositories/IUserRepository';
import { UserRepositoryInMemory } from '../../src/modules/users/repositories/inMemory/UserRepositoryInMemory';
import { CreateUserService } from '../../src/modules/users/services/CreateUserService';
import { UpdateUserService } from '../../src/modules/users/services/UpdateUserService';
import LibraryError from '../../src/shared/errors/LibError';

describe('Update user service', () => {
  let userRepositoryInMemory: IUserRepository;
  let createUserService: CreateUserService;
  let updateUserService: UpdateUserService;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserService = new CreateUserService(userRepositoryInMemory);
    updateUserService = new UpdateUserService(userRepositoryInMemory);
  });

  it('should be able to update user', async () => {
    const user: ICreateUserDTO = {
      email: 'example@example.com',
      password: '1234',
      name: 'User test',
    };

    const userCreated = (await createUserService.execute(user)) as User;

    await updateUserService.execute({
      ...userCreated,
      password: user.password,
    });

    expect(userCreated).toHaveProperty('id');
    expect(userCreated.name).toEqual(user.name);
    expect(userCreated.email).toEqual(user.email);
  });

  it('should not be able to update user without user', async () => {
    const user: User = {
      id: 'UUID',
      email: 'example@example.com',
      password: '1234',
      name: 'User test',
    } as User;

    await expect(updateUserService.execute(user)).rejects.toEqual(
      new LibraryError('User does not exists', 404),
    );
  });
});
