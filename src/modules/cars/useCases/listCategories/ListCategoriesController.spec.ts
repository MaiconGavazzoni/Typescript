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

 

  it("Espero que liste todas as categorias", async () => {

    const responseToken = await request(app).post("/sessions")
      .send({
        email: "admin@rentx.com.br",
        password: "admin"
      })

    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Categoria SupertTest2",
        description: "Descrição SuperTest2"
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);

    console.log(response.body);
  });


  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

})