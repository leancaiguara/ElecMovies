const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      // Match Username User
      const user = await User.findOne({ where: { username } });
      if (!user) return done(null, false, { message: "username not found" });
      // Match Password's User
      const hash = await user.hasheo(password, user.salt);
      if (hash === user.password) {
        return done(null, user);
      }
      return done(null, false, { message: "password not found" });
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("esto es de serializar", user.id);
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  console.log("esta entrando aca?");
  User.findByPk(id)
    .then((user) => {
      console.log("deserializando", user);
      done(null, user);
    })
    .catch(done);
});
