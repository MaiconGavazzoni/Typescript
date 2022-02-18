import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import NODE_ENV from '../../../.env'

// interface IOptions {
//   host: string;
// }

// getConnectionOptions().then(options => {
//   const newOptions = options as IOptions;
//   newOptions.host = 'database_ignite'; //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
//   createConnection({
//     ...options,
//   });
// });

export default async(host = "database_ignite" ): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions,{
      host: NODE_ENV.env === "test"? "localhost" : host,
      database: NODE_ENV.env === "test"? "rentx_test" : defaultOptions.database,
    })
  )
}