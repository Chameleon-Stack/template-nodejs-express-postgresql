import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const { name, email, password } = request.body;

    const photo = request.file.filename;

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      photo,
    });

    return response.status(201).json(user);
  }
}
