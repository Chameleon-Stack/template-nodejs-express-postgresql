import { inject, injectable } from 'tsyringe';
import { ICardRepository } from '../repositories/ICardRepository';

@injectable()
export class DeleteCardService {
  constructor(
    @inject('CardRepository')
    private cardRepository: ICardRepository,
  ) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error('the id does not exist!');
    }

    const card = await this.cardRepository.findById(id);

    if (!card) {
      throw new Error('The card does not exist');
    }

    await this.cardRepository.delete(card);
  }
}
