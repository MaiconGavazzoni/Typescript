import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest{
  name: string;
  description: string;
}

class CreateSpecificationUseCase{
//coloca o private para ter acesso ao this.
  constructor(private specificationsRepository : ISpecificationsRepository){

  }
  //executa o create do Objeto
  execute({name, description}: IRequest): void{
    const specificationsAlreadyExists = this.specificationsRepository.findByName(name);

    if(specificationsAlreadyExists){
      throw new Error("Specification already exists");
      
    }

    this.specificationsRepository.create({
      name, 
      description
    });
  }
}

export { CreateSpecificationUseCase};