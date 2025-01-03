import sqlite3 from "sqlite3";

const SQLite3 = sqlite3.verbose();

const query = (command, params, method = "all") => {
  return new Promise((resolve, reject) => {
    db[method](command, params, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const db = new SQLite3.Database(
  "database.db",
  SQLite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      return console.log(`Erro na conexão com o banco: ${err.message}`);
    } else {
      return console.log("Conectado ao banco!");
    }
  }
);

export { db, query };
