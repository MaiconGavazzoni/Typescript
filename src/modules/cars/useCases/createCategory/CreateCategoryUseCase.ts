import { AppError } from "@shared/errors/AppError";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoriesRepository";
import {inject, injectable} from "tsyringe";


interface IRequest{
  name: string;
  description: string;
}
// [] - Definir o tipo de retorno
// [] - Alterar o retorno de error
// [] - Acessar o repositório
// [] - Retornar algo

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoryRepository
    ) {}
  async execute({name, description}: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError("Category Already exists");
    }

    this.categoriesRepository.create({ name, description });
  }
}


export { CreateCategoryUseCase };