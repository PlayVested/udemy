const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request');

app.use(express.static("public"));
app.use(express.static("../../lib"));
app.set('view engine', 'ejs');

// 'body-parse' takes form data and builds a JS object out of it that we can manipulate
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/yelpCamp'); // add ':27017' to the address if it needs a port

// schema setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
});
const Campground = mongoose.model('Campground', campgroundSchema);

function createCampground(campground) {
    Campground.create(campground, (err, newCampground) => {
        if (err) {
            console.error(`Error: ${err}`);
        } else {
            console.error(`Created: ${newCampground}`);
        }
    });
}

// This static data was moved to the mongoDB
const defaultCampgrounds = [
    {
        name: 'yellowstone',
        image: 'http://www.wildnatureimages.com/images%203/060731-372..jpg',
        description: 'this is my description',
    },
    {
        name: 'backyard',
        image: 'https://cl9r93gnrb42o3l0v1aawby1-wpengine.netdna-ssl.com/wp-content/uploads/2018/02/Camping.jpg',
        description: 'totally pretty',
    },
    {
        name: 'your mom`s house',
        image: 'https://media.istockphoto.com/photos/golden-sunrise-illuminating-tent-camping-dramatic-mountain-landscape-picture-id526564828?k=6&m=526564828&s=612x612&w=0&h=dGJ7atG6qx7zMs0JNLCLcxQ5SAnWbQDlw5wFljirYLM=',
        description: 'the best ever',
    },
];

// if there is nothing in the DB, populate it with a couple enrties
Campground.find({}, (err, campgrounds) => {
    if (err) {
        console.error(`Error: ${err}`);
    } else if (campgrounds.length === 0) {
        console.log('Createing default campgrounds');
        for (let c of defaultCampgrounds) {
            createCampground(c);
        }
    }
});

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
    Campground.findById(req.params.id, (err, campground) => {
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