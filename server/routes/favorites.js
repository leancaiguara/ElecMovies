const router = require("express").Router();
const controller = require("../controllers/favoriteController");
const { checkAuth } = require("../middlewares/checkAuth");

router.post("/add", checkAuth, controller.createFavorite);

router.get("/:id", checkAuth, controller.getFavorites);

router.delete("/remove", checkAuth, controller.removeFavorite);

router.put("/edit", checkAuth, controller.editComment);

module.exports = router;
