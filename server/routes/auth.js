const router = require("express").Router();
const controller = require("../controllers/authController");
const passport = require("passport");
const { checkAuth } = require("../middlewares/checkAuth");

router.post("/signup", controller.register);

router.post("/signin", passport.authenticate("local"), controller.login);

router.get("/logout", checkAuth, controller.logOut);

router.get("/me", checkAuth, controller.login);

module.exports = router;
