import { inject, injectable } from 'tsyringe';
import LibError from '../../../shared/errors/LibError';
import { ICategoryRepository } from '../../categories/repositories/ICategoryRepository';
import { IUserRepository } from '../../users/repositories/IUserRepository';
import { ICreateCardServiceDTO } from '../dtos/ICreateCardServiceDTO';
import { Card } from '../infra/typeorm/entities/Card';
import { ICardRepository } from '../repositories/ICardRepository';

@injectable()
export class CreateCardService {
  constructor(
    @inject('CardRepository')
    private cardRepository: ICardRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute({
    user_id,
    description,
    title,
    status,
    category_ids,
  }: ICreateCardServiceDTO): Promise<Card> {
    if (!user_id || !description || !title || !status) {
      throw new LibError('Error in the creation of the card!');
    }

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new LibError('User does not exists!', 404);
    }

    const categories = [];
    if (category_ids && category_ids?.length > 0) {
      for (const category_id of category_ids) {
        const category = await this.categoryRepository.findById(category_id);

        if (category) categories.push(category);
      }
    }

    const card = await this.cardRepository.create({
      status,
      title,
      description,
      user,
      categories,
    });

    return card;
  }
}
