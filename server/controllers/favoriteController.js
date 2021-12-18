const Favorite = require("../models/Favorites");
const User = require("../models/User");

class FavoriteCtrl {
  static async createFavorite(req, res) {
    try {
      const newFavorite = await Favorite.create(req.body);
      res.status(200).send(newFavorite);
    } catch (err) {
      res.status(500).send(console.log(err));
    }
  }

  static async getFavorites(req, res) {
    try {
      const favo = await Favorite.findAll({
        where: {
          userId: req.params.id,
        },
        include: [
          {
            association: Favorite.User,
          },
        ],
      });
      res.status(200).send(favo);
    } catch (err) {
      res.status(500).send(console.log(err));
    }
  }

  static async removeFavorite(req, res) {
    try {
      await Favorite.destroy({
        where: {
          userId: req.body.userId,
          movieId: req.body.movieId,
        },
      });
      res.status(200).send("ok");
    } catch (err) {
      console.log(err);
    }
  }

  static async editComment(req, res) {
    try {
      const edit = await Favorite.update(
        { comment: req.body.comment },
        {
          where: {
            userId: req.body.userId,
            movieId: req.body.movieId,
          },
        }
      );
      res.status(200).send(edit);
    } catch (err) {
      res.send(console.log(err));
    }
  }
}

module.exports = FavoriteCtrl;
