import request from 'supertest';
import { UpdateUserService } from '../../src/modules/users/services/UpdateUserService';
import { app } from '../../src/shared/infra/http/app';
import { User } from '../../src/modules/users/infra/typeorm/entities/User';

jest.mock('../../src/modules/users/services/UpdateUserService');
const updateUserServiceMock = UpdateUserService as jest.MockedClass<
  typeof UpdateUserService
>;

describe('Update user controller test', () => {
  beforeEach(async () => {
    updateUserServiceMock.mockClear();
  });

  it('Should be able to update a user', async () => {
    updateUserServiceMock.prototype.execute.mockResolvedValueOnce(new User());

    const response = await request(app).patch(`/user`).send({
      email: 'example@example.com',
      password: '1234',
      name: 'User test',
    });

    expect(response.status).toEqual(201);
  });
});
