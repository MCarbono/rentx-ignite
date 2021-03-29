import { Request, Response } from 'express';
import {ListCategoriesUseCase} from '../listCategories/ListCategoriesUseCase';
import { container } from 'tsyringe';

class ListCategoriesController {
    
    async handle(request: Request, response: Response): Promise<Response>{
        const listCategoriesUsecase = container.resolve(ListCategoriesUseCase);
        const all = await listCategoriesUsecase.execute();

        return response.json(all);
    }
}

export { ListCategoriesController };