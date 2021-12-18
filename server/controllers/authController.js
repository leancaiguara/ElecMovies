const User = require("../models/User");

class Auth {
  static async register(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.status(201).send(newUser);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static login(req, res) {
    res.status(200).send(req.user);
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
