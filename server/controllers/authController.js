const User = require("../models/User");
const joiSchema = require("../utils/joi");

class Auth {
  static async register(req, res) {
    try {
      const { username, password } = req.body;
      const { error } = joiSchema.validate({ username, password });
      if (!error) {
        const newUser = await User.create(req.body);
        return res.status(201).send(newUser);
      }
      return res.status(404).json("Bad Request");
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static login(req, res) {
    return res.status(200).send(req.user);
  }

  static async logOut(req, res) {
    await req.logOut();
    res.status(200).clearCookie("connect.sid", {
      path: "/",
    });
    req.session.destroy(function (err) {
      return res.send({});
    });
  }
}
module.exports = Auth;
