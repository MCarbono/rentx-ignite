import {injectable, inject } from 'tsyringe';
import { hash } from 'bcrypt';

import { IUsersRepository } from '../../repositories/IUsersRepository';

import  {ICreateUserDTO } from '../../../dtos/ICreateUserDTO'

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}

    async execute({ driver_license, email, name, password}: ICreateUserDTO): Promise<void>{

        const userAlreadyExists = await this.usersRepository.findByEmail(email)

        if(userAlreadyExists)
            throw new Error('User already exist')

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            driver_license, 
            email, 
            name, 
            password: passwordHash
        })
    }
}

export { CreateUserUseCase }