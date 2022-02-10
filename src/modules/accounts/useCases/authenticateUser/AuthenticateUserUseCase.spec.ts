import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;


describe("Autenticação do Usuário", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  })



  it("Espero que seja autenticado um usuário", async () => {
    const user: ICreateUserDTO = {
      name: "User Test",
      email: "maicon@example5.com",
      password: "12345",
      driver_license: "00123",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    console.log(result);

    expect(result).toHaveProperty("token");

  });

  it("Verifico se o usuário que está tentando autenticar existe", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Verifico se a senha informada está incorreta", () => {
    expect(async () => {

      const user: ICreateUserDTO = {
        name: "User Test",
        email: "maicon@example.com",
        password: "12345",
        driver_license: "00123",
      };
  
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: "maicon@example.com",
        password: "incorrect password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

})