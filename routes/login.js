// register routes

const express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    mongoose = require("mongoose"),
    User = mongoose.model("User");

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
    console.log("req.body: ", req.body);

    // registering
    // passport-local-mongoose function
    User.register(
        // do not define password in User
        new User({ username: req.body.username }),
        req.body.password,
        (err, user) => {
            if (err) {
                res.render("register", {
                    message: "Your registration information is not valid",
                });
            } else {
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/");
                });
            }
        }
    );
});

router.post("/login", (req, res, next) => {
    if (req.body.username) {
        if (req.body.password) {
            // passport middleware
            passport.authenticate(
                "local",
                // if user does not authenticate --> get redirected
                { failureRedirect: "/login" },
                (err, user, info) => {
                    if (user) {
                        console.log(req.user);

                        // Log in
                        req.login(user, (err) => {
                            if (err) {
                                res.render("login", {
                                    message: err,
                                });
                            }

                            res.redirect("/");
                        });
                    } else {
                        res.render("login", {
                            message: "Your login or password is incorrect.",
                        });
                    }
                }
            )(req, res, next);
        } else {
            res.render("login", { message: "PLease provide password" });
        }
    } else {
        res.render("login", { message: "PLease provide username" });
    }
});

module.exports = router;
