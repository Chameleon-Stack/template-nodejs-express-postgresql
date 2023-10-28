import request from 'supertest';
import { UpdateCardService } from '../../src/modules/cards/services/UpdateCardService';
import { app } from '../../src/shared/infra/http/app';
import { Card } from '../../src/modules/cards/infra/typeorm/entities/Card';

jest.mock('../../src/modules/cards/services/UpdateCardService');
const updateUserServiceMock = UpdateCardService as jest.MockedClass<
  typeof UpdateCardService
>;

describe('Update card controller test', () => {
  beforeEach(async () => {
    updateUserServiceMock.mockClear();
  });

  it('Should be able to update a card', async () => {
    updateUserServiceMock.prototype.execute.mockResolvedValueOnce(new Card());

    const response = await request(app).patch(`/card/uuid`).send({
      id: 'uuid',
      status: '10',
      title: 'Test',
      description: 'Test card',
    });

    expect(response.status).toEqual(201);
  });
});
