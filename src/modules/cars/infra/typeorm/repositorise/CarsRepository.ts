import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { Car } from "../entities/Car";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";





class CarsRepository implements ICarsRepository {

  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);

  }


  async create({ name, description, daily_date, license_plate, fine_amount, brand, category_id }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_date,
      license_plate,
      fine_amount,
      brand,
      category_id
    });

    await this.repository.save(car);
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });

    return car as Car;
  }

  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand });
    }

    if (name) {
      carsQuery.andWhere("c.name = :name", { name });
    }

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars as Car[];
  }

}

export { CarsRepository };