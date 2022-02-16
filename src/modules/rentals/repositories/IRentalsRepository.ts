import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";




interface IRentalsRepository{
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create(car_id: string, image_name: string, expected_return_date: Date): Promise<Rental>;

}


export { IRentalsRepository};