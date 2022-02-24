import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTorkensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTorkensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";


let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTorkensRepositoryInMemory;
let mailProvider: MailProviderInMemory;


describe('Envio de Email', () => {

  beforeEach(() => {

    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTorkensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );


  })


  it("Envio de email para troca de senha", async () => {

    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "3121966023",
      email: "napev@logol.mc",
      name: "Eunice Armstrong",
      password: "1234"
    });

    await sendForgotPasswordMailUseCase.execute("napev@logol.mc");

    expect(sendMail).toHaveBeenCalled();

  })

  it(" Não deve mandar um email se o usuário não existe", async () => {

      await expect(sendForgotPasswordMailUseCase.execute("wuofe@ite.mg")
      ).rejects.toEqual(new AppError("User does not exist"));
  })

  it("  Deve criar um novo token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

    usersRepositoryInMemory.create({
      driver_license: "312196",
      email: "mnapev@logol.mc",
      name: "Eunice Brmstrong",
      password: "1234"
    })

    await sendForgotPasswordMailUseCase.execute("mnapev@logol.mc");

    expect(generateTokenMail).toBeCalled();
  })
})