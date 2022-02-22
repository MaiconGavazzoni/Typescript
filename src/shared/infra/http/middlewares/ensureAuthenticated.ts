import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import auth from "@config/auth";
import { UserTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokensRepository";

interface IPayload{
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  //Bearer  jjjfsfçafjç
  const authHeader = request.headers.authorization;
  const userTokensRepository = new UserTokensRepository();

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  //separa pelo espaço " ", e devolve a segunda posição sendo nomeada pela variável token
  const [, token] = authHeader.split(" ");

  
  try {
    const { sub: user_id } = verify(token, auth.secret_refresh_token ) as IPayload;
   
    const user = await userTokensRepository.findByUserIdAndRefreshToken(user_id, token);

    if(!user){
      throw new AppError("User does not exist", 401);
    }

    request.user = {
      id: user_id
    }

    next();
  } catch{
    throw new AppError("Invalid token!", 401);
  }
}