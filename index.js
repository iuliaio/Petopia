const express = require("express");
const sqlite3 = require("sqlite3");
const session = require("express-session");
const handleError = require('./middlewares/handleError')

const app = express();

app.use(session({
    secret: "5B267DE23DA662A19DEA66E7D888D615", resave: false, saveUninitialized: false,
}));

app.use(handleError)

app.set("view engine", "ejs");
app.set("views", __dirname + "/views/");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

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
app.use("/", homeRoutes);

const petsRoutes = require("./routes/petsRoute");
app.use('/pets', petsRoutes);

const chatRoute = require("./routes/chatRoute");
app.use('/chats', chatRoute);

const userRoute = require("./routes/userRoute");
app.use('/user', userRoute);

const reviewRoute = require("./routes/reviewRoute");
app.use('/review', reviewRoute);

const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}! You can access it at: http://localhost:${port}`);
});
