import request from 'supertest';
import { GetCardsService } from '../../src/modules/cards/services/GetCardsService';
import { Card } from '../../src/modules/cards/infra/typeorm/entities/Card';
import { app } from '../../src/shared/infra/http/app';

jest.mock('../../src/modules/cards/services/GetCardsService');
const getCardsServiceMock = GetCardsService as jest.MockedClass<
  typeof GetCardsService
>;

describe('Get cards controller test', () => {
  beforeEach(async () => {
    getCardsServiceMock.mockClear();
  });

  it('Should be able to get cards', async () => {
    const card = new Card();

    getCardsServiceMock.prototype.execute.mockResolvedValueOnce([card]);

    const response = await request(app).get(`/card/uuid`);

    expect(response.body).toEqual([card]);
    expect(response.status).toEqual(200);
  });
});
