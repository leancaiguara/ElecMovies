const express = require("express");
const session = require("express-session");
const passport = require("passport");
const volleyball = require("volleyball");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/db");
const routes = require("./routes/index");
//init
const app = express();

//settings
require("dotenv").config();
require("./config/passport");

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(volleyball);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600 * 24 * 60 * 60 * 365,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
//routes
app.use("/api", routes);

//static files

//server
db.sync({}).then(() =>
  app.listen(process.env.PORT || 8000, () => {
    console.log(`App listening at http://localhost:${process.env.PORT}`);
  })
);
