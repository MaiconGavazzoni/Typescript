import "reflect-metadata";
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



createConnection();
const app = express();

app.use(express.json());

//disponibiliza uma rota par acessar a documentação e colocamos o arquivo dentro
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

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



app.listen(3333, () => console.log("Servidor rodando na porta 3333, veja: http://localhost:3333 \nDocumentação veja: http://localhost:3333/api-docs"));