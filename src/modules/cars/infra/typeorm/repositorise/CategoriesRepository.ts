import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { getRepository, Repository} from 'typeorm';

import { ICategoryRepository, ICreateCategoryDTO } from "../../../repositories/ICategoriesRepository";



// singleton

class CategoriesRepository implements ICategoryRepository {

  //Membro privado de classe para acessar os métodos do typeorm
 private repository: Repository<Category>

  //Membro Static permitem serem acessados ​​usando o nome da classe e a notação de ponto
  //private static INSTANCE: CategoriesRepository;

  constructor() {
    this.repository = getRepository(Category); 
  }


  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description
    })

   await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({name});
    return category as Category;
  }

}

export { CategoriesRepository };