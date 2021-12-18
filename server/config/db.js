const sequelize = require("sequelize");

const db = new sequelize("elecmovies", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
