import { inject, injectable } from 'tsyringe';
import LibError from '../../../shared/errors/LibError';
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
      throw new LibError('User does not exists!', 404);
    }

    await this.usersRepository.delete(user);
  }
}
