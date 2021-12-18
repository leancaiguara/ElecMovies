const Seq = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");

class Users extends Seq.Model {
  hasheo(password, salt) {
    return bcrypt.hash(password, salt);
  }
}

Users.init(
  {
    username: {
      type: Seq.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Seq.STRING,
      allowNull: false,
    },
    salt: {
      type: Seq.STRING,
    },
    favoritos: {
      type: Seq.TEXT,
    },
  },
  { sequelize: db, modelName: "user", timestamps: false }
);

Users.addHook("beforeCreate", (user, options) => {
  return bcrypt
    .genSalt(12)
    .then((salt) => {
      user.salt = salt;
      return user.hasheo(user.password, salt);
    })
    .then((hash) => (user.password = hash));
});

module.exports = Users;
