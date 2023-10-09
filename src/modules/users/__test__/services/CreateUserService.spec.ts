import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUserRepository } from '../../repositories/IUserRepository';
import { UserRepositoryInMemory } from '../../repositories/inMemory/UserRepositoryInMemory';
import { CreateUserService } from '../../services/CreateUserService';

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

    const userCreated = await createUserService.execute(user);

    expect(userCreated).toHaveProperty('id');
    expect(userCreated.name).toEqual(user.name);
    expect(userCreated.email).toEqual(user.email);
  });

  it('should be able to create user with params missing', async () => {
    await expect(
      createUserService.execute({
        name: null,
        email: 'false@email.com',
        password: '1234',
      }),
    ).rejects.toEqual(new Error('Missins params!'));
  });

  it('should be able to create user with params missing', async () => {
    const user: ICreateUserDTO = {
      email: 'example@example.com',
      password: '1234',
      name: 'User test',
    };

    await createUserService.execute(user);

    await expect(createUserService.execute(user)).rejects.toEqual(
      new Error('User already exists!'),
    );
  });
});
