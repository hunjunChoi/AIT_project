const express = require("express"),
    router = express.Router(),
    mongoose = require("mongoose"),
    Closet = mongoose.model("Closet"),
    connectEnsureLogin = require("connect-ensure-login");

/* const isAuthenticated = (req, res, next) => {
    if (!req.user) {
        res.redirect("/");
        console.log("redirecting");
    } else {
        console.log("req.user: ", req.user);
        next();
    }
};

router.use(isAuthenticated); */

router.get("/", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    Closet.find(
        { user: req.user ? req.user._id : undefined },
        (err, closets, count) => {
            res.render("display-closet.hbs", { closets: closets });
        }
    );
});

router.get("/create", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.render("list-create.hbs");
});

router.post("/create", (req, res) => {
    const { name } = req.body;
    new Closet({
        user: req.user._id,
        name: name,
        createdAt: Date.now(),
    }).save((err, closet, count) => {
        console.log(closet.slug);
        res.redirect(`/closet/${closet.slug}`);
    });
});

// catch slugged path
router.get("/:slug", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    console.log("req.params: ", req.params);

    const { slug } = req.params;

    // console.log("slug: ", { slug });

    // works with Closet.plugin(URLSlugs("name"));
    Closet.findOne({ slug }, (err, closet, count) => {
        res.render("closet-slug.hbs", {
            closet,
            displayOutfits: closet.ootds.length >= 1,
        });
    });
});

module.exports = router;
