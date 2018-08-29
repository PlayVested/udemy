const express = require('express');
const app = express();
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const LocalStrategy = require('passport-local');
// const passportLocalMongoose = require('passport-local-mongoose');

const User = require('./models/user');

app.use(express.static(__dirname + "/public"));
app.use(express.static("../../lib"));

// set up express to store session info in the app
app.use(expressSession({
    secret: 'This is my super secret message used to encode things',
    resave: false,
    saveUninitialized: false,
}));

// these need to come after the express session is set up with the secret
app.use(passport.initialize());
app.use(passport.session());

// tell passport how to deal with the User in the session
// these are provided by passportLocalMongoose
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// tell it that we are using ejs as the templating framework
app.set('view engine', 'ejs');

// 'body-parse' takes form data and builds a JS object out of it that we can manipulate
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/authDemo'); // add ':27017' to the address if it needs a port

app.get('/', (req, res) => {
    res.render('home');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

app.get('/secret', isLoggedIn, (req, res) => {
    res.render('secret');
});

// show signup form
app.get('/register', (req, res) => {
    res.render('register');
});

// handle signing up a new user
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    User.register(new User({username}), password, (err, user) => {
        if (err) {
            console.error(err);
            return res.render('register');
        }

        // new user has been created
        passport.authenticate('local')(req, res, () => {
            res.redirect('/secret');
        });
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login',
}), (req, res) => {
    // nothing to actually do, user will be redirected on success or failure
});

app.get('/logout', (req, res) => {
    // this will trash the current session
    req.logout();

    // send them back to the home page
    res.redirect('/');
});

app.listen(1979, 'localhost', () => {
    console.log(`listening on port 1979`);
});
