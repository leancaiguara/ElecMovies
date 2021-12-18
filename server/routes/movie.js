const router = require("express").Router();
const controller = require("../controllers/movieController");
const axios = require("axios");

router.get("/discover", controller.discover);

router.get("/:id", controller.getMovie);

router.get("/search/:title", controller.searchMovie);

module.exports = router;
