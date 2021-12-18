const router = require("express").Router();

const authRouter = require("./auth");
const movieRouter = require("./movie");
const favoriteRouter = require("./favorites");

router.use("/auth", authRouter);
router.use("/movie", movieRouter);
router.use("/favorite", favoriteRouter);

module.exports = router;
