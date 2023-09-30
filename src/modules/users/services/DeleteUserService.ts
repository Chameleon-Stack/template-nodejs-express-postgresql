import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
export class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error('User does not exists!');
    }

    await this.usersRepository.delete(user);
  }
}
