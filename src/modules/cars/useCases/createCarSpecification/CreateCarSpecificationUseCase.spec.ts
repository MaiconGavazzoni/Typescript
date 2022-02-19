import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";


let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Criar uma Especificação de Carro", () => {
  beforeEach(() => {

    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationRepositoryInMemory);


  })

  it("Espero não criar uma nova especificação para um carro que não existe", async () => {
    const car_id = "1234"
    const specifications_id = ["54321"];
    await expect(createCarSpecificationUseCase.execute({ car_id, specifications_id })
    ).rejects.toEqual(new AppError("Esse Carro não existe"));

  });

  it("Espero criar uma nova especificação de Carro", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name",
      description: "Description",
      daily_date: 100,
      license_plate: "ABC-5555",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category_id"
    })
    
    const specification = await specificationRepositoryInMemory.create({
      name: "Nome da Especificação",
      description: "Descrição da Especificação"
    })

    const specifications_id = [specification.id] as string[];

   const specificationsCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });

   console.log(specificationsCars);
   expect(specificationsCars).toHaveProperty("specifications");
   expect(specificationsCars.specifications.length).toBe(1);
  })
})