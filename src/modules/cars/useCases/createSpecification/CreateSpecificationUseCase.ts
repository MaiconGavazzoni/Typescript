import { inject, injectable } from 'tsyringe';
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest{
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase{
//coloca o private para ter acesso ao this.
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository : ISpecificationsRepository){

  }
  //executa o create do Objeto
 async execute({name, description}: IRequest): Promise<void>{
    const specificationsAlreadyExists = await this.specificationsRepository.findByName(name);

    if(specificationsAlreadyExists){
      throw new Error("Specification already exists");
      
    }

    await this.specificationsRepository.create({
      name, 
      description
    });
  }
}

export { CreateSpecificationUseCase};