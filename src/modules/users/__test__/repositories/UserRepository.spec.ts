import { Repository } from "typeorm";
import { dataSource } from "../../../../shared/infra/typeorm";
import { User } from "../../infra/typeorm/entities/User";
import { UserRepository } from "../../infra/typeorm/repositories/UserRepository";
import { IUserRepository } from "../../repositories/IUserRepository";

describe('User repository test', () => {
    let ormUserRepository: Repository<User>;
  
    let userRepository: IUserRepository;
  
    beforeAll(async () => {
        ormUserRepository = dataSource.getRepository(User);
  
        userRepository = new UserRepository();
    });
  
    afterEach(async () => {
      await ormUserRepository.delete({});
    });
  
    it('Should be able to create a user', async () => {
      const name = 'test';
      const email = 'test@test';
      const password = '1234';
  
      const user = await userRepository.create({ name ,email,password});
  
      expect(user).toBeInstanceOf(User);
      expect(user).toHaveProperty('id');
      expect(user.name).toEqual(name);
    });
  
    it('Should be able to delete driver', async () => {
      const name = 'XXX 1';
  
      const driver = ormDriverRepository.create({ name });
  
      await ormDriverRepository.save(driver);
  
      await driverRepositoryRepository.delete(driver.id);
  
      const foundDriver = await driverRepositoryRepository.findById(driver.id);
  
      expect(foundDriver).toBe(undefined);
    });
  
    it('Should be able to update driver', async () => {
      const name = 'XXX 2';
  
      const driver = ormDriverRepository.create({ name });
  
      await ormDriverRepository.save(driver);
  
      driver.name = 'YYY 2';
  
      const updateDriver = await driverRepositoryRepository.update(driver);
  
      expect(updateDriver).toBeInstanceOf(Driver);
      expect(driver.name).toEqual('YYY 2');
    });
  
    it('Should be able to find all driver', async () => {
      const name = 'XXX 3';
  
      const driver = ormDriverRepository.create({ name });
  
      await ormDriverRepository.save(driver);
  
      const drivers = await driverRepositoryRepository.findAll();
  
      expect(drivers[0]).toBeInstanceOf(Driver);
      expect(drivers).toHaveLength(1);
    });
  
    it('Should be able to find by name', async () => {
      const name = 'XXX 4';
  
      const driver = ormDriverRepository.create({ name });
  
      await ormDriverRepository.save(driver);
  
      const drivers = await driverRepositoryRepository.findByName(name);
  
      expect(drivers[0]).toBeInstanceOf(Driver);
      expect(drivers).toHaveLength(1);
    });
  
    it('Should be able to find by ID', async () => {
      const name = 'XXX 4';
  
      const driver = ormDriverRepository.create({ name });
  
      await ormDriverRepository.save(driver);
  
      const foundDriver = await driverRepositoryRepository.findById(driver.id);
  
      expect(foundDriver).toBeInstanceOf(Driver);
      expect(foundDriver.id).toEqual(driver.id);
    });
  });