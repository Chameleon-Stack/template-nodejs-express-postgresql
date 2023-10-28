import { ICreateUserDTO } from '../../src/modules/users/dtos/ICreateUserDTO';
import { User } from '../../src/modules/users/infra/typeorm/entities/User';
import { IUserRepository } from '../../src/modules/users/repositories/IUserRepository';
import { UserRepositoryInMemory } from '../../src/modules/users/repositories/inMemory/UserRepositoryInMemory';
import { CreateUserService } from '../../src/modules/users/services/CreateUserService';
import LibraryError from '../../src/shared/errors/LibError';

describe('Create user service', () => {
  let userRepositoryInMemory: IUserRepository;
  let createUserService: CreateUserService;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserService = new CreateUserService(userRepositoryInMemory);
  });

  it('should be able to create user', async () => {
    const user: ICreateUserDTO = {
      email: 'example@example.com',
      password: '1234',
      name: 'User test',
    };

    const userCreated = (await createUserService.execute(user)) as User;

    expect(userCreated).toHaveProperty('id');
    expect(userCreated.name).toEqual(user.name);
    expect(userCreated.email).toEqual(user.email);
  });

  it('should not be able to create user with params missing', async () => {
    const user: ICreateUserDTO = {
      email: 'example@example.com',
      password: '1234',
      name: 'User test',
    };

    await createUserService.execute(user);

    await expect(createUserService.execute(user)).rejects.toEqual(
      new LibraryError('User already exists!'),
    );
  });
});
