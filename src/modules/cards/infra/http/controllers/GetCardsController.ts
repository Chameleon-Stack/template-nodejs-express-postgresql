import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetCardsService } from '../../../services/GetCardsService';

export class GetCardsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const getBetsByIdService = container.resolve(GetCardsService);

    const query = request.query;

    const play = await getBetsByIdService.execute(query);

    return response.json(play);
  }
}
