import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";
import createConnection from "./..";


async function create() {
  const conn = await createConnection("localhost");

  const id = uuidV4();
  const password = await hash("admin", 8);
 

  await conn.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXX')`
  );

  await conn.close;
}

create().then(() => {
  console.log("Usuário admin criado com sucesso!")
});