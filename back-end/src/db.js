"use strict";
const mysql = require("mysql");
const sql = require("mssql");
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "bytes123",
  password: process.env.DB_PASS || "aaaaaa",
  database: process.env.DB_NAME || "csdl_fastfood",
  charset: "utf8mb4",
});

const sqlConfig = {
  user: "bytes123",
  password: "123456",
  server: "localhost",
  database: "csdl_fastfood",
  options: {
    trustServerCertificate: true,
  },
};
const dbConn = new sql.ConnectionPool(sqlConfig);
const sqlConnection = dbConn.connect((pool) => {
  return pool;
});

module.exports = {
  db,
  sqlConnection,
};
