const express = require('express');
const router = express.Router();

const passport = require('passport');
const User = require('../models/user');

// index route
router.get('/', (req, res) => {
    res.render('home');
});

// show signup form
router.get('/register', (req, res) => {
    res.render('register');
});

// handle signing up a new user
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    User.register(new User({username}), password, (err, user) => {
        if (err) {
            console.error(err);
            req.flash(`error`, `Failed to register user: ${err.message}`);
            return res.redirect('/register');
        }

        // new user has been created
        passport.authenticate('local')(req, res, () => {
            req.flash(`success`, `Welcome to Yelp Camp ${user.username}`);
            res.redirect('/campgrounds');
        });
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login',
}), (req, res) => {
    // nothing to actually do, user will be redirected on success or failure
});

router.get('/logout', (req, res) => {
    // this will trash the current session
    req.logout();

    req.flash(`success`, `Logged you out!`);

    // send them back to the home page
    res.redirect('/campgrounds');
});

module.exports = router;