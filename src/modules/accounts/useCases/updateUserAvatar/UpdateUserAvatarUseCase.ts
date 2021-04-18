import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { deleteFile } from '@utils/file';
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

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
        private usersRepository: IUsersRepository,

        @inject("StorageProvider")
        private storageProvider: IStorageProvider,
    ){}

    async execute({ avatar_file, user_id}: IRequest): Promise<void>{
        const user = await this.usersRepository.findById(user_id)

        if(user.avatar){
            await this.storageProvider.delete(user.avatar, "avatar");
        }
        await this.storageProvider.save(avatar_file, "avatar") 

        user.avatar = avatar_file;
        
        await this.usersRepository.create(user)
    }
}

export { UpdateUserAvatarUseCase }
