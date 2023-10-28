import { ICreateCardServiceDTO } from '../../src/modules/cards/dtos/ICreateCardServiceDTO';
import { ICardRepository } from '../../src/modules/cards/repositories/ICardRepository';
import { CardRepositoryInMemory } from '../../src/modules/cards/repositories/inMemory/CardRepositoryInMemory';
import { CreateCardService } from '../../src/modules/cards/services/CreateCardService';
import { IUserRepository } from '../../src/modules/users/repositories/IUserRepository';
import { UserRepositoryInMemory } from '../../src/modules/users/repositories/inMemory/UserRepositoryInMemory';

describe('Create card service', () => {
  let cardRepositoryInMemory: ICardRepository;
  let createCardService: CreateCardService;
  let userRepositoryInMemory: IUserRepository;

  beforeEach(() => {
    cardRepositoryInMemory = new CardRepositoryInMemory();
    userRepositoryInMemory = new UserRepositoryInMemory();
    createCardService = new CreateCardService(
      cardRepositoryInMemory,
      userRepositoryInMemory,
    );
  });

  it('should be able to create card', async () => {
    const user = {
      name: 'test',
      email: 'test@test',
      password: '1234',
    };

    const userCreated = await userRepositoryInMemory.create(user);

    const card: ICreateCardServiceDTO = {
      status: '10',
      title: 'Test',
      description: 'Test card',
      user_id: userCreated.id,
    };

    const cardCreated = await createCardService.execute(card);

    expect(cardCreated).toHaveProperty('id');
    expect(cardCreated.title).toEqual(card.title);
  });
});
