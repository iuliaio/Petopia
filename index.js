const express = require("express");
const sqlite3 = require("sqlite3");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");

const app = express();

app.use(
  session({
    secret: "thisismysecretkeyplasedonthack",
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("views", __dirname + "/views/");
app.set("layout", "shared/layout");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

global.db = new sqlite3.Database("./database.db", function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log("Database connected");
    global.db.run("PRAGMA foreign_keys=ON");
  }
});

app.use("/public", express.static(__dirname + "/public"));

const homeRoutes = require("./routes/homeRoute");
const searchRoutes = require("./routes/search");
const petsRoutes = require("./routes/pets");
const shelterRoutes = require("./routes/shelter");
const adoptersRoutes=require('./routes/adopters');
app.use("/", homeRoutes);
app.use("/search", searchRoutes);
app.use('/pets',petsRoutes);
app.use('/shelter',shelterRoutes);
app.use('/adopter',adoptersRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(
    `Example app listening on port ${port}! You can access it at: http://localhost:${port}.`
  );
});
