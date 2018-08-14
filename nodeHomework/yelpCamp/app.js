const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request');

const Campground = require('./models/campground');
const seedData = require('./seedData');

app.use(express.static("public"));
app.use(express.static("../../lib"));
app.set('view engine', 'ejs');

// 'body-parse' takes form data and builds a JS object out of it that we can manipulate
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/yelpCamp'); // add ':27017' to the address if it needs a port

// maybe populate the DB with some starting data
seedData();

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/campgrounds', (req, res) => {
    Campground.find({}, (err, campgrounds) => {
        if (err) {
            console.err(`Error: ${err}`);
        } else {
            res.render('index', {campgrounds});
        }
    });
});

app.get('/campgrounds/new', (req, res) => {
    res.render('new');
});

app.get('/campgrounds/:id', (req, res) => {
    Campground.findById(req.params.id).populate('comments').exec((err, campground) => {
        if (err) {
            console.err(`Error: ${err}`);
        } else {
            res.render('show', {campground});
        }
    });
});

app.post('/campgrounds', (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    // campgrounds.push({name, image});
    Campground.create({name, image, description}, (err, newCampground) => {
        if (err) {
            console.err(`Error: ${err}`);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

app.listen(1979, 'localhost', () => {
    console.log(`listening on port 1979`);
});