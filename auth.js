const mongoose = require("mongoose"),
    passport = require("passport"),
    // Import Strategy library
    LocalStrategy = require("passport-local").Strategy,
    User = mongoose.model("User");

// define strategies for passport
passport.use(new LocalStrategy(User.authenticate()));

// for persistent sessions to work in passport:
// user is authenticated --> new session begins --> serialize user data to the session & the user ID is stored in req.session.passport.user
// 1. authenticated user must be serialized to the session
passport.serializeUser(User.serializeUser());

// access user data --> deserialize -> use the user ID as its key
// 2. and deserialized when subsequent request is made
passport.deserializeUser(User.deserializeUser());
