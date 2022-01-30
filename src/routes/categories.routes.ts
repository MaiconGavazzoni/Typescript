import { Router} from "express";

import { CategoriesRepository} from "../modules/cars/repositories/implementations/CategoriesRepository";
//import { PostgresCategoriesRepository } from "../modules/cars/repositories/PostgresCategoriesRepository";
import createCategoryController from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";
import { importCategoryController} from "../modules/cars/useCases/importCategory"

import multer from "multer";

const categoriesRoutes = Router();

//multer faz o upload de arquivos
const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", (request, response) =>{
  console.log("reload funcionando3")
  return createCategoryController().handle(request, response);
});

categoriesRoutes.get("/", (request, response) =>{
  return listCategoriesController.handle(request, response);

})

categoriesRoutes.post("/import", upload.single("file"), (request, response) =>{
  return importCategoryController.handle(request, response);
})

export { categoriesRoutes };