const mongoose = require("mongoose"),
    URLSlugs = require("mongoose-url-slugs"),
    // auto-generate hash & salt fields in DB
    passportLocalMongoose = require("passport-local-mongoose");

// TODO: reference doc vs embedded doc
const User = new mongoose.Schema({
    // username, password

    // __id: ...
    // array of object ID
    closets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Closet" }],
    // username: ...
    // salt: ...
    // hash: ...
    // __v: ...

    // no fields for PW
});

const Ootd = new mongoose.Schema(
    {
        type: { type: String, required: true },
        color: { type: String, required: true },
        checked: { type: Boolean, default: false, required: true },
    },
    {
        _id: true,
    }
);

const Closet = new mongoose.Schema({
    // __id: ...
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    // slug: ...
    ootds: [Ootd],
    // __v: ...
});

// export User model
// plugin for passportLocalMongoose
User.plugin(passportLocalMongoose);

Closet.plugin(URLSlugs("name"));

mongoose.model("User", User);
mongoose.model("Closet", Closet);
mongoose.model("Ootd", Ootd);

/* const UserSchema = mongoose.Schema({
    username: { type: String, required: true, min: 3 },

    // hash + pw
    password: { type: String, required: true },
});

mongoose.model("User", UserSchema); */

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

// useNewUrlParser --> facilitate conversions for older application
// useUnifiedTopology --> connection management engine was upgraded
mongoose.connect(dbconf, { useNewUrlParser: true, useUnifiedTopology: true });
