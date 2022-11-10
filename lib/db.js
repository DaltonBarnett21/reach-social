import { Pool } from "pg";

let connect;

if (!connect) {
  connect = new Pool({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: "5432",
    database: "reach",
  });
}

export default connect;
