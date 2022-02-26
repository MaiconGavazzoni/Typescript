import auth from "@config/auth";
import { UserTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayLoad{
  sub: string;
  email: string;
}

interface ITokenResponse{
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase{

  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: UserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ){}

  async execute(token: string): Promise<ITokenResponse>{
   const {email, sub} = verify(token, auth.secret_refresh_token) as IPayLoad;

   const user_id = sub;

   const userToken = await this.userTokensRepository.findByUserIdAndRefreshToken(user_id, token);

   if(!userToken){
     throw new AppError("Refresh Token does not exists!");
   }

   await this.userTokensRepository.deleteById(userToken.id);

   
   const refresh_token = sign({ email }, auth.secret_refresh_token, {
    subject: sub,
    expiresIn: auth.expires_refresh_token_days
  });

  const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days);

  await this.userTokensRepository.create({
    user_id,
    refresh_token,
    expires_date
  })

   //Gerar jsonWebtoken
   const newToken = sign({}, auth.secret_token, {
    subject: user_id,
    expiresIn: auth.expires_in_token
  });

  return {
    token: newToken,
    refresh_token,
  }

  };

}

export {RefreshTokenUseCase};