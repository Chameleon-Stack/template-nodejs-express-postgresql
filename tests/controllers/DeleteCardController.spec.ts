import request from 'supertest';
import { DeleteCardService } from '../../src/modules/cards/services/DeleteCardService';
import { app } from '../../src/shared/infra/http/app';

jest.mock('../../src/modules/cards/services/DeleteCardService');
const deleteCardServiceMock = DeleteCardService as jest.MockedClass<
  typeof DeleteCardService
>;

describe('Delete card controller test', () => {
  beforeEach(async () => {
    deleteCardServiceMock.mockClear();
  });

  it('Should be able to delete a card', async () => {
    deleteCardServiceMock.prototype.execute.mockResolvedValueOnce();

    const response = await request(app).delete(`/card/:uuid`);

    expect(response.status).toEqual(204);
  });
});
