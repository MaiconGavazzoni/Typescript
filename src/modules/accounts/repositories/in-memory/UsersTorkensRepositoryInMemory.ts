import { ICreateUsersTokenDTO } from "@modules/accounts/dtos/ICreateUsersTokenDTO";
import { UsersTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";




class UsersTorkensRepositoryInMemory implements IUsersTokensRepository{

  usersTokens : UsersTokens[] = [];



  async create({ user_id, refresh_token, expires_date }: ICreateUsersTokenDTO): Promise<UsersTokens> {
    const userToken = new UsersTokens();

    Object.assign(userToken, {
      user_id,
      refresh_token,
      expires_date,
    });

    this.usersTokens.push(userToken);

    return userToken as UsersTokens;
  }
  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens> {
    const userToken = this.usersTokens.find(ut => ut.user_id === user_id && ut.refresh_token);

    return userToken as UsersTokens;
  }
 async deleteById(id: string): Promise<void> {
   const userToken = this.usersTokens.find(ut => ut.id === id) as UsersTokens;
    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }

 async findByRefreshToken(refresh_token: string): Promise<UsersTokens> {
    const userToken = this.usersTokens.find(ut => ut.refresh_token === refresh_token);
    return userToken as UsersTokens;
  }

}

export {UsersTorkensRepositoryInMemory};