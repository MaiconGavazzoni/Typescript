import "reflect-metadata";
import "dotenv/config";
import express, {Request, Response, NextFunction} from "express";
import "express-async-errors";
//chama direto porquê esta no index.ts
import "../../container";
import  createConnection from  "@shared/infra/typeorm";
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";

//pega o arquivo json da documentação
import swaggerFile from "../../../swagger.json";
import { AppError } from "../../errors/AppError";
import upload from "@config/upload";



createConnection();
const app = express();

app.use(express.json());

//disponibiliza uma rota par acessar a documentação e colocamos o arquivo dentro
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`))
app.use("/cars", express.static(`${upload.tmpFolder}/cars`))

app.use(router);

//Mensagem de erro customizada
app.use((err:Error, request: Request, response: Response, next: NextFunction)=>{
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      message: err.message,
    })
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });

})



export { app };