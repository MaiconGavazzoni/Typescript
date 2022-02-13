import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";




let listAvailableCarsUseCase : ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('ListCars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  })

  it("Espero que liste todos os carros disponíveis", async () => {

   const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Carro description",
      daily_date: 140,
      license_plate: "ABC-5556",
      fine_amount: 60,
      brand: "Car_Brand",
      category_id: "category_id"
    })

    const cars = await listAvailableCarsUseCase.execute({});
    console.log(cars);
    expect(cars).toEqual([car])
  })

  it("Espero que liste todos os carros pela marca", async () => {
    
   const car = await carsRepositoryInMemory.create({
    name: "Car 1",
    description: "Carro description",
    daily_date: 140,
    license_plate: "ABC-5560",
    fine_amount: 60,
    brand: "Car_Brand2",
    category_id: "category_id"
  })

  const cars = await listAvailableCarsUseCase.execute({
    brand: "Car_Brand2",
  });
  console.log(cars);
  expect(cars).toEqual([car])
  })

  it("Espero que liste todos os carros pela nome", async () => {
    
    const car = await carsRepositoryInMemory.create({
     name: "Car 2",
     description: "Carro description",
     daily_date: 140,
     license_plate: "ABC-5561",
     fine_amount: 60,
     brand: "Car_Brand",
     category_id: "category_id"
   })
 
   const cars = await listAvailableCarsUseCase.execute({
     name: "Car 2",
   });
   console.log(cars);
   expect(cars).toEqual([car])
   })

   it("Espero que liste todos os carros pela categoria", async () => {
    
    const car = await carsRepositoryInMemory.create({
     name: "Car 2",
     description: "Carro description",
     daily_date: 140,
     license_plate: "ABC-5562",
     fine_amount: 60,
     brand: "Car_Brand",
     category_id: "category_id"
   })
 
   const cars = await listAvailableCarsUseCase.execute({
    category_id: "category_id",
   });
   console.log(cars);
   expect(cars).toEqual([car])
   })

})