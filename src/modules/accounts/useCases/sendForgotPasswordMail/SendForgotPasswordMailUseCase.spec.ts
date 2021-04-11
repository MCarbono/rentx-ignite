import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory"
import { AppError } from "@shared/errors/AppError"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider
let mailProvider: MailProviderInMemory
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase

describe("Send a forgotten email", () => {

    beforeEach(() => {
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        dateProvider = new DayjsDateProvider()
        mailProvider = new MailProviderInMemory()
        sendForgotPasswordMailUseCase =  new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        )
    })

    it("Should be able to send a forgot password mail to user", async () => {
        const sendMail = spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "664168",
            email: "teste@gmail.com",
            name: "marcelo",
            password: "1234"
        });

        await sendForgotPasswordMailUseCase.execute("teste@gmail.com")

        expect(sendMail).toHaveBeenCalled();
    })

    it("Should not be able to send an email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("teste1@gmail.com")
        ).rejects.toEqual(new AppError("User does not exists!"))
    })

    it("Should be able to create an users token", async () => {
        const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");
        usersRepositoryInMemory.create({
            driver_license: "777777",
            email: "teste2@gmail.com",
            name: "marcelo2",
            password: "1234"
        });

        await sendForgotPasswordMailUseCase.execute("teste2@gmail.com")

        expect(generateTokenMail).toBeCalled();
    })
})