import { inject, injectable } from 'tsyringe';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../infra/typeorm/entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    photo,
  }: ICreateUserDTO): Promise<User> {
    if (!name || !email || !password) {
      throw new Error('Missins params!');
    }

    const foundUser = await this.userRepository.findByEmail(email);

    if (foundUser) {
      throw new Error('User already exists!');
    }

    const user = await this.userRepository.create({
      name,
      email,
      password,
      photo,
    });

    return { ...user, password: '' };
  }
}
