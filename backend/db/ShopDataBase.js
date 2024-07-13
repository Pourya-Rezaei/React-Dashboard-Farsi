const mysql = require("mysql");

const ShopDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_shop",
});

module.exports = ShopDB;
