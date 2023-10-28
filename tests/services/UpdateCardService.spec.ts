import { ICreateCardDTO } from '../../src/modules/cards/dtos/ICreateCardDTO';
import { IUpdateCardServiceDTO } from '../../src/modules/cards/dtos/IUpdateCardServiceDTO';
import { ICardRepository } from '../../src/modules/cards/repositories/ICardRepository';
import { CardRepositoryInMemory } from '../../src/modules/cards/repositories/inMemory/CardRepositoryInMemory';
import { UpdateCardService } from '../../src/modules/cards/services/UpdateCardService';
import { ICategoryRepository } from '../../src/modules/categories/repositories/ICategoryRepository';
import { CategoryRepositoryInMemory } from '../../src/modules/categories/repositories/inMemory/CategoryRepositoryInMemory';
import { User } from '../../src/modules/users/infra/typeorm/entities/User';
import LibraryError from '../../src/shared/errors/LibError';

describe('Update card service', () => {
  let cardRepositoryInMemory: ICardRepository;
  let categoryRepositoryInMemory: ICategoryRepository;
  let updateCardService: UpdateCardService;

  beforeEach(() => {
    cardRepositoryInMemory = new CardRepositoryInMemory();
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    updateCardService = new UpdateCardService(
      cardRepositoryInMemory,
      categoryRepositoryInMemory,
    );
  });

  it('should be able to update user', async () => {
    const card: ICreateCardDTO = {
      status: '10',
      title: 'Test',
      description: 'Test card',
      user: new User(),
    };

    const cardCreated = await cardRepositoryInMemory.create(card);

    const cardUpdate = await updateCardService.execute({
      ...cardCreated,
      status: '20',
    });

    expect(cardCreated).toHaveProperty('id');
    expect(cardCreated.status).toEqual(cardUpdate.status);
  });

  it('should not be able to update card does not exists', async () => {
    await expect(
      updateCardService.execute({
        id: 'uuid',
        description: 'test',
      } as IUpdateCardServiceDTO),
    ).rejects.toEqual(new LibraryError('the card does not exist', 404));
  });
});
