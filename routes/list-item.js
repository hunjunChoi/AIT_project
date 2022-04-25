const express = require("express"),
    router = express.Router(),
    mongoose = require("mongoose"),
    Closet = mongoose.model("Closet"),
    Ootd = mongoose.model("Ootd");

router.post("/create", (req, res) => {
    const { listSlug, name, quantity } = req.body;
    const listItem = { name, quantity };

    Closet.findOneAndUpdate(
        { slug: listSlug },
        { $push: { ootds: listItem } },
        (err, list, count) => {
            console.log(err);
            res.redirect(`/list/${listSlug}`);
        }
    );
});

router.post("/check", (req, res) => {
    const { listSlug, items } = req.body;

    Closet.findOne({ slug: listSlug }, (err, list, count) => {
        console.log(`items: ${items}, list: ${list}`);
        for (let i = 0; i < list.items.length; i++) {
            console.log(list.items[i]);
            if (items?.includes(list.items[i].name)) {
                list.items[i].checked = true;
            }
        }
        list.markModified("items");
        list.save((err, savedList, count) => {
            console.log(err);
            res.redirect(`/list/${listSlug}`);
        });
    });
});

module.exports = router;
