// register routes

const express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    mongoose = require("mongoose"),
    User = mongoose.model("User"),
    argon2 = require("argon2");

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

// to homepage
router.get("/", (req, res) => {
    res.render("home");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    User.register(new User({ username }), req.body.password, (err, user) => {
        if (err) {
            res.render("register", {
                message: "Your registration information is not valid",
            });
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/");
            });
        }
    });
});

/* // TODO: Can't use argon2 on linserv
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ username: username }).exec();
    // debug
    console.log("exsiting user", existingUser);

    if (!existingUser) {
        // hash
        const hash = await argon2.hash(password);
        const savedUser = await new User({
            username: username,
            password: hash,
        }).save();

        console.log("saved User", savedUser);
        res.redirect("/");

        //  const u = await new User({ username: username, password: hash });
        // u.save((err, savedUser) => {
        //     if (!err) {
        //         console.log("saved User", savedUser);
        //         res.redirect("/");
        //     } else {
        //         console.log("err", err);
        //         res.send("Could not register");
        //     }
        // }); 
        // } else {
        res.render("register", { error: "Could not register" });
    }
}); */

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if (user) {
            req.logIn(user, (err) => {
                res.redirect("/");
            });
        } else {
            res.render("login", {
                message: "Your login or password is incorrect.",
            });
        }
    })(req, res, next);
});

module.exports = router;
