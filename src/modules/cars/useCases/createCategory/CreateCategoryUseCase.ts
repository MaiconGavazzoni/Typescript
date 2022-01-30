
import { ICategoryRepository } from "../../repositories/ICategoriesRepository";

interface IRequest{
  name: string;
  description: string;
}
// [] - Definir o tipo de retorno
// [] - Alterar o retorno de error
// [] - Acessar o repositório
// [] - Retornar algo

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoryRepository){

  }
  async execute({name, description}: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category Already exists");
    }

    this.categoriesRepository.create({ name, description });
  }
}


export { CreateCategoryUseCase };