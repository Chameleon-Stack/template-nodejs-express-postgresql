import request from 'supertest';
import { CreateCategoryService } from '../../src/modules/categories/services/CreateCategoryService';
import { Category } from '../../src/modules/categories/infra/typeorm/entities/Category';
import { app } from '../../src/shared/infra/http/app';

jest.mock('../../src/modules/categories/services/CreateCategoryService');
const createCategoryServiceeMock = CreateCategoryService as jest.MockedClass<
  typeof CreateCategoryService
>;

describe('Create category controller test', () => {
  beforeEach(async () => {
    createCategoryServiceeMock.mockClear();
  });

  it('Should be able to create a category', async () => {
    await createCategoryServiceeMock.prototype.execute.mockResolvedValueOnce(
      new Category(),
    );

    const response = await request(app).post(`/category/uuid`).send({
      name: 'Category test',
    });

    expect(response.status).toEqual(201);
  });
});
