import { Repository } from 'typeorm';
import { ICardRepository } from '../../src/modules/cards/repositories/ICardRepository';
import { IUserRepository } from '../../src/modules/users/repositories/IUserRepository';
import { User } from '../../src/modules/users/infra/typeorm/entities/User';
import { CardRepository } from '../../src/modules/cards/infra/typeorm/repositories/CardRepository';
import { Card } from '../../src/modules/cards/infra/typeorm/entities/Card';
import { UserRepository } from '../../src/modules/users/infra/typeorm/repositories/UserRepository';
import { ICreateCardDTO } from '../../src/modules/cards/dtos/ICreateCardDTO';
import { IGetAllCardsDTO } from '../../src/modules/cards/dtos/IGetAllCardsDTO';
import dataSourceTest from '../../src/config/__test__';

describe('Card repository test', () => {
  let ormCardRepository: Repository<Card>;

  let cardRepository: ICardRepository;
  let userRepository: IUserRepository;

  let user: User;

  beforeAll(async () => {
    ormCardRepository = dataSourceTest.getRepository(Card);

    cardRepository = new CardRepository();
    userRepository = new UserRepository();

    const name = 'test';
    const email = 'test@test';
    const password = '1234';

    user = await userRepository.create({ name, email, password });
  });

  afterEach(async () => {
    await ormCardRepository.delete({});
  });

  it('Should be able to create a card', async () => {
    const card: ICreateCardDTO = {
      status: '10',
      title: 'Test 1',
      description: 'Test card 1',
      user,
    };

    const createdCard = await cardRepository.create(card);

    expect(createdCard).toBeInstanceOf(Card);
    expect(createdCard).toHaveProperty('id');
    expect(createdCard.status).toEqual(card.status);
  });

  it('Should be able to delete card', async () => {
    const card: ICreateCardDTO = {
      status: '10',
      title: 'Test 2',
      description: 'Test card 2',
      user,
    };

    const createdCard = ormCardRepository.create(card);

    await ormCardRepository.save(createdCard);

    await cardRepository.delete(createdCard);

    const foundCard = await cardRepository.findById(createdCard.id);

    expect(foundCard).toBeNull();
  });

  it('Should be able to update card', async () => {
    const card: ICreateCardDTO = {
      status: '10',
      title: 'Test 3',
      description: 'Test card 3',
      user,
    };

    const createdCard = ormCardRepository.create(card);

    await ormCardRepository.save(createdCard);

    createdCard.status = '20';

    const updateCard = await cardRepository.update(createdCard);

    expect(updateCard).toBeInstanceOf(Card);
    expect(updateCard.status).toEqual('20');
  });

  it('Should be able to find by ID', async () => {
    const card: ICreateCardDTO = {
      status: '10',
      title: 'Test 4',
      description: 'Test card 4',
      user,
    };

    const createdCard = ormCardRepository.create(card);

    await ormCardRepository.save(createdCard);

    const foundCard = (await cardRepository.findById(createdCard.id)) as Card;

    expect(foundCard).toBeInstanceOf(Card);
    expect(foundCard.id).toEqual(createdCard.id);
  });

  it('Should be able to find all', async () => {
    const card: ICreateCardDTO = {
      status: '10',
      title: 'Test 5',
      description: 'Test card 5',
      user,
    };

    const createdCard = ormCardRepository.create(card);

    await ormCardRepository.save(createdCard);

    const foundCard = await cardRepository.findAll({
      user_id: createdCard.user_id,
    } as IGetAllCardsDTO);

    expect(foundCard[0]).toBeInstanceOf(Card);
    expect(foundCard[0].id).toEqual(createdCard.id);
    expect(foundCard).toHaveLength(1);
  });
});
