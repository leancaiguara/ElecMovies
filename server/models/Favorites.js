const Seq = require("sequelize");
const db = require("../config/db");
const User = require("./User");

class Favorites extends Seq.Model {}

Favorites.init(
  {
    movieId: {
      type: Seq.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: Seq.STRING,
      allowNull: false,
      unique: true,
    },
    img: {
      type: Seq.STRING,
    },
    value: {
      type: Seq.STRING,
    },
    comment: {
      type: Seq.TEXT,
    },
  },
  { sequelize: db, modelName: "favorite" }
);

Favorites.User = Favorites.belongsTo(User);

module.exports = Favorites;
