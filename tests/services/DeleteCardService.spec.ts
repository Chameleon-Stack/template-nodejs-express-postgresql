import { v4 as uuidv4 } from 'uuid';
import { ICardRepository } from '../../src/modules/cards/repositories/ICardRepository';
import { DeleteCardService } from '../../src/modules/cards/services/DeleteCardService';
import { CardRepositoryInMemory } from '../../src/modules/cards/repositories/inMemory/CardRepositoryInMemory';
import { ICreateCardDTO } from '../../src/modules/cards/dtos/ICreateCardDTO';
import { User } from '../../src/modules/users/infra/typeorm/entities/User';
import LibraryError from '../../src/shared/errors/LibError';

describe('Delete card service', () => {
  let cardRepositoryInMemory: ICardRepository;
  let deleteCardUseCase: DeleteCardService;

  beforeEach(() => {
    cardRepositoryInMemory = new CardRepositoryInMemory();
    deleteCardUseCase = new DeleteCardService(cardRepositoryInMemory);
  });

  it('should be able to delete card', async () => {
    const card: ICreateCardDTO = {
      status: '10',
      title: 'Test',
      description: 'Test card',
      user: new User(),
    };

    const cardCreated = await cardRepositoryInMemory.create(card);

    await deleteCardUseCase.execute(cardCreated.id);
  });

  it('should not be able to delete card does not exists', async () => {
    await expect(deleteCardUseCase.execute(uuidv4())).rejects.toEqual(
      new LibraryError('The card does not exist', 404),
    );
  });
});
