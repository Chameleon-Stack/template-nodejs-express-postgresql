import { UpdateUserService } from '@modules/users/services/UpdateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateUserService = container.resolve(UpdateUserService);

    const { name, email, password, new_password } = request.body;

    const photo = request.file.filename;
    const id = request.params.id;

    const user = await updateUserService.execute({
      id,
      password,
      new_password,
      name,
      email,
      photo,
    });

    return response.status(201).json(user);
  }
}
