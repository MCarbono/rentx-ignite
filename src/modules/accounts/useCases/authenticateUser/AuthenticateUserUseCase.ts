import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { sign } from 'jsonwebtoken';
import { AppError } from '@shared/errors/AppError';

/**
 * Essa função é usada para comparar a senha não criptografada
 * com a criptografada no bd
 */
import { compare} from 'bcrypt';
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string
    },
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse>{
        const user = await this.usersRepository.findByEmail(email);

        const {
            expires_in_token,
            secret_refresh_token,
            secret_token,
            expires_in_refresh_token,
            expires_refresh_token_days
         } = auth

        if(!user)
            throw new AppError('Email or password incorrect!')
        
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch)
            throw new AppError('Email or password incorrect!')
        
        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token
        });

        const expires_date = this.dateProvider.addDays(expires_refresh_token_days);

        //Token generate
        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        })
        
        //insert refresh_token into db
        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date,
        })

        //Objeto que dados do user após o login
        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            },
            refresh_token
        }
        
        return tokenReturn;
    }
}

export { AuthenticateUserUseCase }