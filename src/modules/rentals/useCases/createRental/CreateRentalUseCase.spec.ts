import { CreateRentalUseCase } from "./CreateRentalUseCase";


let createRentalUseCase: CreateRentalUseCase;
describe("Criar um Aluguel",()=>{
  beforeEach(() => {
    createRentalUseCase = new CreateRentalUseCase();
  })



  it("Espero que crie um aluguel de carros", async()=>{
    //const rental = await createRentalUseCase.execute();

    //console.log(rental);
    //expect(rental.length).toBe(1)
  })
})