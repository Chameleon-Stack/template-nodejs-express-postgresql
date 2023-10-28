import request from 'supertest';
import { SessionService } from '../../src/modules/users/services/SessionService';
import { User } from '../../src/modules/users/infra/typeorm/entities/User';
import { app } from '../../src/shared/infra/http/app';

jest.mock('../../src/modules/users/services/SessionService');
const sessionServiceMock = SessionService as jest.MockedClass<
  typeof SessionService
>;

describe('Session controller', () => {
  beforeEach(async () => {
    sessionServiceMock.mockClear();
  });

  it('Should be able to session user', async () => {
    const user = new User();

    sessionServiceMock.prototype.execute.mockResolvedValueOnce({
      user,
      token: 'token',
    });

    const response = await request(app).post(`/user/session`);

    expect(response.body).toHaveProperty('token');
    expect(response.status).toEqual(200);
  });
});
