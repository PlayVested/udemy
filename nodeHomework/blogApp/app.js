// npm install express body-parser mongoose request ejs --save
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const request = require('request');

app.use(express.static("public"));
app.use(express.static("../../lib"));
app.set('view engine', 'ejs');

// 'body-parse' takes form data and builds a JS object out of it that we can manipulate
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/blogApp'); // add ':27017' to the address if it needs a port

// schema setup
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now},
});
const BlogEntry = mongoose.model('BlogEntry', blogSchema);

function createObject(obj) {
    BlogEntry.create(obj, (err, newObj) => {
        if (err) {
            console.error(`Error: ${err}`);
        } else {
            console.error(`Created: ${newObj}`);
        }
    });
}

// This data is used to populate the DB if there is nothing in there
const defaultData = [
    {
        title: 'pickles',
        image: 'https://www.browneyedbaker.com/wp-content/uploads/2011/08/bread-butter-pickles-prep1-600.jpg',
        body: 'I like pickles, do you?',
    },
];

// if there is nothing in the DB, populate it with a couple enrties
BlogEntry.find({}, (err, blogEntries) => {
    if (err) {
        console.error(`Error: ${err}`);
    } else if (blogEntries.length === 0) {
        console.log('Createing default blog entries');
        for (let defObj of defaultData) {
            createObject(defObj);
        }
    }
});

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/blogs', (req, res) => {
    BlogEntry.find({}, (err, blogEntries) => {
        if (err) {
            console.err(`Error: ${err}`);
        } else {
            res.render('index', {blogEntries});
        }
    });
});

app.get('/blogs/new', (req, res) => {
    res.render('new');
});

app.get('/blogs/:id', (req, res) => {
    BlogEntry.findById(req.params.id, (err, blogEntries) => {
        if (err) {
            console.err(`Error: ${err}`);
        } else {
            res.render('show', {blogEntries});
        }
    });
});

app.post('/blog', (req, res) => {
    const title = req.body.title;
    const image = req.body.image;
    const body = req.body.body;
    BlogEntry.create({title, image, body}, (err, newBlogEntry) => {
        if (err) {
            console.err(`Error: ${err}`);
        } else {
            res.redirect('/blogs');
        }
    });
});

app.listen(1979, 'localhost', () => {
    console.log(`listening on port 1979`);
});