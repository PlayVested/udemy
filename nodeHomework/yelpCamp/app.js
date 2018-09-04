const express = require('express');
const app = express();
const expressSession = require('express-session');

const bodyParser = require('body-parser');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('./models/user');
const seedData = require('./seedData');

const campgroundRoutes = require('./routes/campgrounds');
const commentRoutes = require('./routes/comments');
const indexRoutes = require('./routes/index');

app.use(express.static(__dirname + "/public"));
app.use(express.static("../../lib"));
app.use(methodOverride('_method'));
app.use(flash()); // this needs to come before passport configuration
app.set('view engine', 'ejs');

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

// 'body-parse' takes form data and builds a JS object out of it that we can manipulate
app.use(bodyParser.urlencoded({extended: true}));

// fall back on a local DB if one isn't provided through an env variable
const dbURL = process.env.DATABASEURL || 'mongodb://localhost/yelpCamp';
mongoose.connect(dbURL); // add ':27017' to the address if it needs a port

// maybe populate the DB with some starting data
seedData();

// this will inject the signed in user to all pages
// so we can reference it on any page
app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

// wire up all the sub-routes
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:campgroundID/comments', commentRoutes);
app.use('/', indexRoutes);

app.listen(1979, 'localhost', () => {
    console.log(`listening on port 1979`);
});
