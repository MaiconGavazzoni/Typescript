import express from "express";
//chama direto porquê esta no index.ts
import "./database";
import "./shared/container";
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";

//pega o arquivo json da documentação
import swaggerFile from "./swagger.json";




const app = express();

app.use(express.json());

//disponibiliza uma rota par acessar a documentação e colocamos o arquivo dentro
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router);



app.listen(3333, () => console.log("Servidor rodando na porta 3333, veja: http://localhost:3333 \nDocumentação veja: http://localhost:3333/api-docs"));