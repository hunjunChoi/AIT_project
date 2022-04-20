const mongoose = require("mongoose"),
    URLSlugs = require("mongoose-url-slugs"),
    passportLocalMongoose = require("passport-local-mongoose");

const User = new mongoose.Schema({
    // username, password
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "ootd" }],
});

const Item = new mongoose.Schema(
    {
        name: { type: String, required: true },
        quantity: { type: Number, min: 1, required: true },
        checked: { type: Boolean, default: false, required: true },
    },
    {
        _id: true,
    }
);

const List = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    createdAt: { type: Date, required: true },
    items: [Item],
});

User.plugin(passportLocalMongoose);
List.plugin(URLSlugs("name"));

mongoose.model("User", User);
mongoose.model("List", List);
mongoose.model("Item", Item);

// is the environment variable, NODE_ENV, set to PRODUCTION?
let dbconf;
if (process.env.NODE_ENV === "PRODUCTION") {
    // if we're in PRODUCTION mode, then read the configration from a file
    // use blocking file io to do this...
    const fs = require("fs");
    const path = require("path");
    const fn = path.join(__dirname, "config.json");
    const data = fs.readFileSync(fn);

    // our configuration file will be in json, so parse it and set the
    // conenction string appropriately!
    const conf = JSON.parse(data);
    dbconf = conf.dbconf;
} else {
    // if we're not in PRODUCTION mode, then use
    dbconf = "mongodb://localhost/closattire";
}

mongoose.connect(dbconf);
