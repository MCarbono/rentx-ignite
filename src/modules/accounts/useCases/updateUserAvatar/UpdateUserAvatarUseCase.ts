import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { deleteFile } from '@utils/file';

// Adicionar coluna avatar na tabela de users;
// Refatorar o usuário com coluna avatar
// configuração upload multer
// Criar regra de negócio do upload
// Controller
interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}

    async execute({ avatar_file, user_id}: IRequest): Promise<void>{
        const user = await this.usersRepository.findById(user_id)

        if(user.avatar){
            //Usa-se essa concatenação do caminho do arquivo para que ele seja encontrado e excluido.
            await deleteFile(`./tmp/avatar/${user.avatar}`)
        }
        
        user.avatar = avatar_file;

        await this.usersRepository.create(user)
    }
}

export { UpdateUserAvatarUseCase }
