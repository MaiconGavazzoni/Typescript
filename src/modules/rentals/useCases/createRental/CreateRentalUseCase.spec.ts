import dayjs from "dayjs";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { AppError } from "@shared/errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";


let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Criar um Aluguel", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
  })



  it("Espero que crie um aluguel de carros", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Description",
      daily_date: 100,
      license_plate: "12345",
      fine_amount: 60,
      category_id: "1234",
      brand: "Cart Test",

    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "1253",
      expected_return_date: dayAdd24Hours,

    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");

  })

  it("Espero que não crie um aluguel de carros para um usuário que tenha um aluguel em aberto", async () => {
    await rentalRepositoryInMemory.create({
      car_id: "11111",
      expected_return_date: dayAdd24Hours,
      user_id: "12536",

    });
    await expect(createRentalUseCase.execute({
      user_id: "12536",
      car_id: "123456",
      expected_return_date: dayAdd24Hours,
    })

    ).rejects.toEqual(new AppError("Esse usuário já tem um carro alugado."));

  })

  it("Espero que não crie um aluguel para um carro que tenha um aluguel em aberto", async () => {
    await rentalRepositoryInMemory.create({
      car_id: "2222",
      expected_return_date: dayAdd24Hours,
      user_id: "1253",

    });
    await expect(createRentalUseCase.execute({
      user_id: "125",
      car_id: "2222",
      expected_return_date: dayAdd24Hours,

    })
    ).rejects.toEqual(new AppError("O carro não está disponível"));

  })

  it("Espero que não crie um aluguel para um período inferior à 24Horas", async () => {

    await expect(createRentalUseCase.execute({
      user_id: "12536",
      car_id: "456",
      expected_return_date: dayjs().toDate(),

    })

    ).rejects.toEqual(new AppError("O aluguel de carros deve ser por mais 24Horas."));

  })
})