import { inject, injectable } from "tsyringe";

import { compare } from "bcryptjs";
import { sign } from "jsonWebtoken";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  },
  token: string;
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    //Usuario existe?
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect");
    }
    // Senah correta?
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }
    //Gerar jsonWebtoken
    const token = sign({}, "138a4781e0c7590522af5423f65aeeaf", {
      subject: user.id,
      expiresIn: "1d"
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token
    };
  }

}

export { AuthenticateUserUseCase };