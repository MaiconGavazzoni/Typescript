
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4} from "uuid";
import { resolve} from "path";


@injectable()
class SendForgotPasswordMailUseCase{
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider,
    @inject("MailProvider")
    private etherealMailProvider: IMailProvider,
  ){}
  async execute(email: string){
    const user = await this.usersRepository.findByEmail(email);
    const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs")

    if(!user){
      throw new AppError("User does not exist")
    }

    const token = uuidV4();

    const expires_date = this.dayjsDateProvider.addHours(3);

    await this.userTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    //cria as variáveis para colocar no hml do email
    const variables = {
      name: user.name,
      link: `${process.env.APP_API_URL}/password/reset?token=${token}`
    }

    console.log("Chegou no envio", email);
    await this.etherealMailProvider.sendMail(email ,"Recuperação de Senha" ,variables ,templatePath);


  }
}

export {SendForgotPasswordMailUseCase};