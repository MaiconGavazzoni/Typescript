import { ICreateUsersTokenDTO } from "../dtos/ICreateUsersTokenDTO";
import { UsersTokens } from "../infra/typeorm/entities/UserTokens";




interface IUsersTokensRepository{

  create({user_id, refresh_token, expires_date}:ICreateUsersTokenDTO): Promise<UsersTokens>;
  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UsersTokens>;
}


export { IUsersTokensRepository};