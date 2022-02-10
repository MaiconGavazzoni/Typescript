import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Criar categoria", () => {
  
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  })

  test("Espero que seja criada uma nova categoria", async () => {
    const categories ={
      name: "Name Teste", 
      description:"Descrição Teste"
    }

    
    await createCategoryUseCase.execute(categories);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(categories.name);
    console.log(categoryCreated);

    expect(categoryCreated).toHaveProperty("id");   
  });

  test("Não pode criar uma categoria com mesmo nome", async () => {
   
    expect(async () => {
      const categories ={
        name: "Name Teste", 
        description:"Descrição Teste"
      }
     
      await createCategoryUseCase.execute(categories);
  
      await createCategoryUseCase.execute(categories);
    }).rejects.toBeInstanceOf(AppError);   
  });


});