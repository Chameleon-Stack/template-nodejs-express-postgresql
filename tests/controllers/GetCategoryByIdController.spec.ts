import request from 'supertest';
import { GetCategoriesService } from '../../src/modules/categories/services/GetCategoriesService';
import { Category } from '../../src/modules/categories/infra/typeorm/entities/Category';
import { app } from '../../src/shared/infra/http/app';

jest.mock('../../src/modules/categories/services/GetCategoriesService');
const getCategoriesServiceMock = GetCategoriesService as jest.MockedClass<
  typeof GetCategoriesService
>;

describe('Get category by id controller test', () => {
  beforeEach(async () => {
    getCategoriesServiceMock.mockClear();
  });

  it('Should be able to get category by id', async () => {
    const category = new Category();

    getCategoriesServiceMock.prototype.execute.mockResolvedValueOnce([
      category,
    ]);

    const response = await request(app).get(`/category/uuid`);

    expect(response.body).toEqual([category]);
    expect(response.status).toEqual(200);
  });
});
