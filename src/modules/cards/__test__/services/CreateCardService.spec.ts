import LibError from '../../../../shared/errors/LibError';
import { IUserRepository } from '../../../users/repositories/IUserRepository';
import { UserRepositoryInMemory } from '../../../users/repositories/inMemory/UserRepositoryInMemory';
import { ICreateCardServiceDTO } from '../../dtos/ICreateCardServiceDTO';
import { ICardRepository } from '../../repositories/ICardRepository';
import { CardRepositoryInMemory } from '../../repositories/inMemory/CardRepositoryInMemory';
import { CreateCardService } from '../../services/CreateCardService';

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
    const card: ICreateCardServiceDTO = {
      status: '10',
      title: 'Test',
      description: 'Test card',
      user_id: 'uuid',
    };

    const cardCreated = await createCardService.execute(card);

    expect(cardCreated).toHaveProperty('id');
    expect(cardCreated.title).toEqual(card.title);
  });

  it('should not be able to create card with params missing', async () => {
    await expect(
      createCardService.execute({
        status: '10',
        title: 'Test',
        description: 'Test card',
        user_id: null,
      }),
    ).rejects.toEqual(new LibError('Error in the creation of the card!'));
  });
});
