import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationsRepository implements ISpecificationsRepository{

  private specifications: Specification[];

  constructor(){
    this.specifications = [];
  }
 
  
  //Método para instanciar a classe
  create({ name, description }: ICreateSpecificationDTO): void {

    const specification = new Specification();

    // atribui os valores passados por parâmetro para o objeto criado
    Object.assign(specification,{
      name,
      description,
      created_at: new Date()
    });

    //inclui o objeto no array specifications[]
    this.specifications.push(specification);
  }

  //Método para buscar se existe uma specificação com mesmo nome
  findByName(name: string): Specification {
    const specification = this.specifications.find((specification) => specification.name === name);
    return specification;
  }



}


export { SpecificationsRepository};