const axios = require("axios");

class Movie {
  static async discover(req, res) {
    try {
      const movies = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?api_key=d0c83c8a2ca84331effaa40c522e664f"
      );
      res.status(200).send(movies.data);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async getMovie(req, res) {
    try {
      const movie = await axios.get(
        `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=d0c83c8a2ca84331effaa40c522e664f`
      );
      res.status(200).send(movie.data);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async searchMovie(req, res) {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=d0c83c8a2ca84331effaa40c522e664f&query=${req.params.title}`
      )
      .then((pelis) => pelis.data)
      .then((data) => res.send(data))
      .catch(console.error);
  }
}

module.exports = Movie;
