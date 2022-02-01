import { getRepository, Repository } from 'typeorm';
import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationsRepository implements ISpecificationsRepository {

  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }


  //Método para instanciar a classe
  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {

    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);
  }

  //Método para buscar se existe uma specificação com mesmo nome
  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({name});
    return specification;
  }



}


export { SpecificationsRepository };