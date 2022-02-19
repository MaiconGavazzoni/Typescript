import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";



class CarsRepositoryInMemory implements ICarsRepository{
  
  
  cars: Car[] = [];

  async create({brand, name, description, daily_date, category_id, fine_amount, license_plate, id}: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand, 
      name, 
      description, 
      daily_date, 
      category_id, 
      fine_amount, 
      license_plate,
      id
    })


    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate) as Car;
  }

  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> { 
    const cars = this.cars.filter(
      (car) => {
        if(car.available === true || ((brand && car.brand === brand) || (category_id && category_id === category_id) ||
        (name && name === name))){
          return car;
        }
       return null;
      });
      return cars as Car[];
    
  }

  async findById(id: string): Promise<Car> {
    const car = this.cars.find((car)=> car.id === id);
    return car as Car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {

    const car = this.cars.findIndex((car)=> car.id === id);
    
    this.cars[car].available = available;   
  }

}

export { CarsRepositoryInMemory };