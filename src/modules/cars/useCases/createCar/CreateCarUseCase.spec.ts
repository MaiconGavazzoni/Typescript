import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";



let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Criar o carro", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  })

  it("Espero que crie um novo carro", async () => {
   const car = await createCarUseCase.execute({
      name: "Name",
      description: "Description",
      daily_date: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "categori_id"

    });

    expect(car).toHaveProperty("id");
  })

  it("Não pode criar um novo carro com uma placa já existente", async () => {
    await createCarUseCase.execute({
      name: "Name",
      description: "Description",
      daily_date: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "categori_id"
    });
    await expect(createCarUseCase.execute({
        name: "Name",
        description: "Description",
        daily_date: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "categori_id"
      })
    ).rejects.toEqual(new AppError("Car already exists"));
  })

  it("Espero que o carro criado esteja disponível para locação", async () => {
    const car = await createCarUseCase.execute({
      name: "Name",
      description: "Description",
      daily_date: 100,
      license_plate: "ABC-5555",
      fine_amount: 60,
      brand: "Brand",
      category_id: "categori_id"
    });
    expect(car.available).toBe(true);

    console.log(car);

  })
})