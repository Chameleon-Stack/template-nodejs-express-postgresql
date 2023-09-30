import { getRepository, Repository } from 'typeorm';
import { ICreateCardDTO } from '../../../dtos/ICreateCardDTO';
import { IGetAllCardsDTO } from '../../../dtos/IGetAllCardsDTO';
import { ICardRepository } from '../../../repositories/ICardRepository';
import { Card } from '../entities/Card';

export class CardRepository implements ICardRepository {
  private ormRepository: Repository<Card>;

  constructor() {
    this.ormRepository = getRepository(Card);
  }

  async create(new_card: ICreateCardDTO): Promise<Card> {
    const card = this.ormRepository.create(new_card);

    return this.ormRepository.save(card);
  }

  async update(card: Card): Promise<Card> {
    return this.ormRepository.save(card);
  }

  async findById(id: string): Promise<Card> {
    return this.ormRepository.findOne({
      where: { id },
    });
  }

  async findAll({
    id,
    description,
    status,
    title,
  }: IGetAllCardsDTO): Promise<Card[]> {
    const query = this.ormRepository.createQueryBuilder('Cards');

    if (id) {
      query.andWhere('cards.id = :id', { id });
    }

    if (description) {
      query.andWhere(`lower(cards.description) ilike '%${description}%'`);
    }

    if (status) {
      query.andWhere('cards.status = :status', { status });
    }

    if (title) {
      query.andWhere(`lower(cards.title) ilike '%${title}%'`);
    }

    return query.getMany();
  }

  async delete(cards: Card): Promise<void> {
    await this.ormRepository.remove(cards);
  }
}
