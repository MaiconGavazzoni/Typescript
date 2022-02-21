import { ICreateUsersTokenDTO } from "@modules/accounts/dtos/ICreateUsersTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UsersTokens } from "../entities/UserTokens";



class UserTokensRepository implements IUsersTokensRepository{

  private repository : Repository<UsersTokens>;
  constructor(){
    this.repository = getRepository(UsersTokens);
  }

  async create({ user_id, refresh_token, expires_date }: ICreateUsersTokenDTO): Promise<UsersTokens> {

    const userToken = this.repository.create({
      user_id, 
      refresh_token,
      expires_date
    })

    await this.repository.save(userToken);

    return userToken
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens>{
    const usersTokens = await this.repository.findOne({user_id, refresh_token});
    return usersTokens as UsersTokens;
  }

  async deleteById(id: string): Promise<void>{
    await this.repository.delete(id);
  }
 

}

export {UserTokensRepository};