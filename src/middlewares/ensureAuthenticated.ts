import { Request, Response, NextFunction} from 'express';
//função usada para verificar se o token é válido
import { verify } from 'jsonwebtoken';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

import { AppError } from '../errors/AppError';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    //Bearer dsadsadsadsadsadsada(token) - information from headers(token format)
    const authHeader  = request.headers.authorization;
    
    if(!authHeader)
        throw new AppError('Token not provided', 401);
    
    //para usar o token, é necessário desestruturá-lo, pois o token vem no formato citado acima
    const [ , token] = authHeader.split(" ");

    try {
        //2° parametro é a chave secreta criada com o método sign 
        const { sub : user_id } = verify(token, "daa308c1587f95140f645b796e04c810") as IPayload;
        
        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);

        if(!user)
            throw new AppError('user does not exists', 401);
        
        // Esse código faz com que vc anexe uma propriedade para o objeto use de request
        // Para alterar o request, é necessário sobrescrever a propriedade request
        // feita na raiz @types/express/index.d.ts
        request.user = {
            id: user_id
        }

        next();
    } catch{
        throw new AppError('Invalid token', 401)
    }
}