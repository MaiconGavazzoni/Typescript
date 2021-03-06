import { app } from "@shared/infra/http/app";
import request from "supertest";

import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";
import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

let connection: Connection;

describe("Criar uma categoria Controller", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);


    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXX')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Espero que crie uma nova categoria", async () => {

    const responseToken = await request(app).post("/sessions")
      .send({
        email: "admin@rentx.com.br",
        password: "admin"
      })

    const { refresh_token }:any = responseToken.body;
    
    const response = await request(app)
      .post("/categories")
      .send({
        name: "Categoria SupertTest",
        description: "Descrição SuperTest"
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(201);
  });

  it("Não pode criar uma categoria com mesmo nome", async () => {

    const responseToken = await request(app).post("/sessions")
      .send({
        email: "admin@rentx.com.br",
        password: "admin"
      })

    console.log(responseToken);
    const { refresh_token }:any = responseToken.body;
    
    const response = await request(app)
      .post("/categories")
      .send({
        name: "Categoria SupertTest",
        description: "Descrição SuperTest"
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(400);
  });

  

})