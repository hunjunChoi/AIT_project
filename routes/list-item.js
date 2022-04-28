const express = require("express"),
    router = express.Router(),
    mongoose = require("mongoose"),
    Closet = mongoose.model("Closet"),
    Ootd = mongoose.model("Ootd");

router.post("/create", (req, res) => {
    const { closetSlug, type, color } = req.body;
    const ootd = { type, color };

    // debug
    console.log("req body LIST ITEM: ", req.body);

    Closet.findOneAndUpdate(
        { slug: closetSlug },
        { $push: { ootds: ootd } },
        (err, list, count) => {
            console.log(err);
            res.redirect(`/closet/${closetSlug}`);
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
