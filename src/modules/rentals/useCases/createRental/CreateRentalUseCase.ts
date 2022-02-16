import { AppError } from "@shared/errors/AppError";


interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}


class CreateRentalUseCase {

  constructor(
    //@inject("CarsRepository")
    private rentalsRepository: IRentalsRepository
  ) { }

  async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<any> {

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)

    if(carUnavailable){
      throw new AppError("O carro não está disponível");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if(rentalOpenToUser){
      throw new AppError("Esse usuário já tem um carro alugado.");
    }

    const rental = this.rentalsRepository.create({
      id: "id",
      name: "name",
    });
    return rental
  }
   


    
}

export { CreateRentalUseCase };