import request from 'supertest';
import { DeleteUserService } from '../../src/modules/users/services/DeleteUserService';
import { app } from '../../src/shared/infra/http/app';

jest.mock('../../src/modules/users/services/DeleteUserService');
const deleteUserServiceMock = DeleteUserService as jest.MockedClass<
  typeof DeleteUserService
>;

describe('Delete user controller test', () => {
  beforeEach(async () => {
    deleteUserServiceMock.mockClear();
  });

  it('Should be able to delete a user', async () => {
    deleteUserServiceMock.prototype.execute.mockResolvedValueOnce();

    const response = await request(app).delete(`/user/:uuid`);

    expect(response.status).toEqual(204);
  });
});
