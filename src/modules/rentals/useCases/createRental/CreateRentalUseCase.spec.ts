import dayjs from "dayjs";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { AppError } from "@shared/errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";


let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider : DayjsDateProvider;

describe("Criar um Aluguel",()=>{
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
  })



  it("Espero que crie um aluguel de carros", async()=>{
   
   const rental = await createRentalUseCase.execute({ 
      car_id:"12345",
      user_id: "1253",
      expected_return_date: dayAdd24Hours,
    
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");

  })

  it("Espero que não crie um aluguel de carros para um usuário que tenha um aluguel em aberto", async()=>{

    expect(async ()=>{
      await createRentalUseCase.execute({        
        user_id: "12536",
        car_id:"1234",
        expected_return_date: dayAdd24Hours,
      
      });
 
       await createRentalUseCase.execute({      
       user_id: "12536",
       car_id:"123456",
       expected_return_date: dayAdd24Hours,
     
     });
    }).rejects.toBeInstanceOf(AppError);
        
   })

   it("Espero que não crie um aluguel de carros para um carro que tenha um aluguel em aberto", async()=>{

    expect(async ()=>{
      await createRentalUseCase.execute({ 
        user_id: "12536",
        car_id:"456",        
        expected_return_date: dayAdd24Hours,
      
      });
 
       await createRentalUseCase.execute({ 
        user_id: "125",
        car_id:"456",      
       expected_return_date: dayAdd24Hours,
     
     });
    }).rejects.toBeInstanceOf(AppError);
        
   })

   it("Espero que não crie um aluguel para um período inferior à 24Horas", async()=>{

    expect(async ()=>{
      await createRentalUseCase.execute({ 
        user_id: "12536",
        car_id:"456",        
        expected_return_date: dayjs().toDate(),
      
      }); 
      
    }).rejects.toBeInstanceOf(AppError);
        
   })
})