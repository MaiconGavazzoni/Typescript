import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";





class RentalsRepositoryInMemory implements IRentalsRepository {
 
  
  rentals: Rental[] = [];
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date) as Rental;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date) as Rental;
  }

  async create({user_id, car_id, expected_return_date,id, end_date, total}: ICreateRentalDTO): Promise<Rental>{

    const rental = new Rental();

    Object.assign(rental, {
      user_id, 
      car_id, 
      expected_return_date,
      start_date: new Date(),
      id, 
      end_date, 
      total
    })

    this.rentals.push(rental);

    return rental;
  };

  async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id) as Rental;
  }
  async findByUserId(user_id: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => rental.user_id === user_id) as Rental[];
  }
  

}

export { RentalsRepositoryInMemory };