require("./db");
require("./auth");

const passport = require("passport");
const express = require("express");
const path = require("path");
// const Auth0Strategy = require("passport-auth0");
// require("dotenv").config();

const routes = require("./routes/login");
const closet = require("./routes/closet");
const listItem = require("./routes/list-item");

const app = express();
const port = process.env.PORT || 3000;

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "hbs");

const logger = (req, res, next) => {
    console.log(req.method, req.path, req.query);
    next();
};
app.use(logger);

app.use((req, res, next) => {
    if (req.get("Host")) {
        next();
    } else {
        res.status(400).send("invalid request... add a host header plz");
    }
});

// enable sessions... so sessions
const session = require("express-session");

// basic express session initialization
// after loggin in --> don't have to log back
const sessionOptions = {
    secret: "secret cookie thang (store this elsewhere!)",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour

    // secret: process.env.SESSION_SECRET,
    // cookie: {},
    // resave: false,
    // saveUninitialized: false,
};
// maintain authenticated session
app.use(session(sessionOptions));

// show what session has
app.use((req, res, next) => {
    console.log("session containes", req.session);
    next();
});

// body parser
// POST requests for req, login
app.use(express.urlencoded({ extended: false }));

const staticPath = path.resolve(__dirname, "public");
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(staticPath));

// passport setup
// middleware to use passport with Express
// initialize passport on every route call
app.use(passport.initialize());

// passport to use express-session
app.use(passport.session());

// make user data available to all templates
app.use((req, res, next) => {
    // user data is queried & attached to req.user
    res.locals.user = req.user;
    next();
});

// Mount routes on their file
app.use("/", routes);
app.use("/closet", closet);
app.use("/list-item", listItem);

app.listen(port, function () {
    console.log(`Server running on port ${port}`);
});
