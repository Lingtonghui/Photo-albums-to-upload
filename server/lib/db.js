const mysql = require("mysql2/promise");
let connection;
module.exports = {
  async initDB() {
    connection = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "root",
      database: "kkb1",
    });
  },
  getDB() {
    return connection;
  },
};
