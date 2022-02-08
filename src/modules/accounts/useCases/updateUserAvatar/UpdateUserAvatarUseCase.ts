import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { deleteFile } from "../../../../utils/file";
interface IRequest {
  user_id: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  // Adicionar coluna Avatar na tabela de users
  // Refatorar o ususário com coluna avatar
  // Configuração do upload no Multer
  //Criar a regra de negócio do upload
  //Criar a controller
  async execute({ user_id, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if(user.avatar){
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }
    
    user.avatar = avatarFile;

    await this.usersRepository.create(user);


  }

}

export { UpdateUserAvatarUseCase };