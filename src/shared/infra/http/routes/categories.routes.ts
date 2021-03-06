import { Router} from "express";

import { CategoriesRepository} from "../../../../modules/cars/infra/typeorm/repositorise/CategoriesRepository";
//import { PostgresCategoriesRepository } from "../modules/cars/repositories/PostgresCategoriesRepository";
import { CreateCategoryController} from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategories/ListCategoriesController";
import { ImportCategoryController} from "../../../../modules/cars/useCases/importCategory/ImportCategoryController"

import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const categoriesRoutes = Router();

//multer faz o upload de arquivos
const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/", ensureAuthenticated, ensureAdmin, createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post("/import",ensureAuthenticated, ensureAdmin, upload.single("file"), importCategoryController.handle);

export { categoriesRoutes };