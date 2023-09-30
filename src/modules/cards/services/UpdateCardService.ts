import { inject, injectable } from 'tsyringe';
import { IUpdateCardServiceDTO } from '../dtos/IUpdateCardServiceDTO';
import { Card } from '../infra/typeorm/entities/Card';
import { ICardRepository } from '../repositories/ICardRepository';

@injectable()
export class UpdateCardService {
  constructor(
    @inject('CardRepository')
    private cardRepository: ICardRepository,
  ) {}

  async execute({
    id,
    description,
    title,
    status,
  }: IUpdateCardServiceDTO): Promise<Card> {
    if (!id && (!description || !title || !status)) {
      throw new Error('the id or the value was not inserted');
    }

    const card = await this.cardRepository.findById(id);

    if (!card) {
      throw new Error('the card does not exist');
    }

    if (description) {
      card.description = description;
    }

    if (title) {
      card.title = title;
    }

    if (status) {
      card.status = status;
    }

    await this.cardRepository.update(card);

    return card;
  }
}
