import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";


interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {

  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {

    const minimumHour = 24 as number;
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)

    if(carUnavailable){
      throw new AppError("O carro não está disponível");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if(rentalOpenToUser){
      throw new AppError("Esse usuário já tem um carro alugado.");
    }

    const dateNow = this.dateProvider.dateNow();
   
    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);
    console.log(compare);
    if(compare < minimumHour){
      throw new AppError("O aluguel de carros deve ser por mais 24Horas.");
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
 
  }
    
}

export { CreateRentalUseCase };