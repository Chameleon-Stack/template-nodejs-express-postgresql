import { Repository } from 'typeorm';
import { User } from '../../src/modules/users/infra/typeorm/entities/User';
import { IUserRepository } from '../../src/modules/users/repositories/IUserRepository';
import { UserRepository } from '../../src/modules/users/infra/typeorm/repositories/UserRepository';
import dataSourceTest from '../../src/config/__test__';

describe('User repository test', () => {
  let ormUserRepository: Repository<User>;

  let userRepository: IUserRepository;

  beforeAll(async () => {
    ormUserRepository = dataSourceTest.getRepository(User);

    userRepository = new UserRepository();
  });

  afterEach(async () => {
    await ormUserRepository.delete({});
  });

  it('Should be able to create a user', async () => {
    const name = 'test';
    const email = 'test@test';
    const password = '1234';

    const user = await userRepository.create({ name, email, password });

    expect(user).toBeInstanceOf(User);
    expect(user).toHaveProperty('id');
    expect(user?.name).toEqual(name);
  });

  it('Should be able to delete user', async () => {
    const name = 'test 1';
    const email = 'test1@test';
    const password = '1234';

    const user = ormUserRepository.create({ name, email, password });

    await ormUserRepository.save(user);

    await userRepository.delete(user);

    const foundUser = await userRepository.findById(user.id);

    expect(foundUser).toBeNull();
  });

  it('Should be able to update user', async () => {
    const name = 'test 2';
    const email = 'test2@test';
    const password = '1234';

    const user = ormUserRepository.create({ name, email, password });

    await ormUserRepository.save(user);

    user.name = 'test update 2';

    const updateUser = await userRepository.update(user);

    expect(updateUser).toBeInstanceOf(User);
    expect(updateUser?.name).toEqual('test update 2');
  });

  it('Should be able to find by ID', async () => {
    const name = 'test 1';
    const email = 'test1@test';
    const password = '1234';

    const user = ormUserRepository.create({ name, email, password });

    await ormUserRepository.save(user);

    const foundUser = await userRepository.findById(user.id);

    expect(foundUser).toBeInstanceOf(User);
    expect(foundUser?.id).toEqual(user.id);
  });
});
