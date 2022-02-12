import {container} from "tsyringe";
import { IUsersRepository} from "../../modules/accounts/repositories/IUsersRepository";
import {ICategoryRepository} from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository} from "../../modules/cars/infra/typeorm/repositorise/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/infra/typeorm/repositorise/SpecificationsRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";
import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";

// ICategoriesRepository
container.registerSingleton<ICategoryRepository>(
  "CategoriesRepository", 
  CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository", 
  SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
  "UsersRepository", 
  UsersRepository
)