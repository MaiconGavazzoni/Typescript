import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload{
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  //Bearer  jjjfsfçafjç
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  //separa pelo espaço " ", e devolve a segunda posição sendo nomeada pela variável token
  const [, token] = authHeader.split(" ");

  
  try {
    const { sub: user_id } = verify(token, "138a4781e0c7590522af5423f65aeeaf") as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);

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