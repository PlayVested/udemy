// npm install express body-parser mongoose request ejs --save
const express = require('express');
const app = express();
const expressSanitizer = require('express-sanitizer');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
// const request = require('request');

app.use(express.static('public'));
app.use(express.static('../../lib'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// 'body-parse' takes form data and builds a JS object out of it that we can manipulate
app.use(bodyParser.urlencoded({extended: true}));

// this must come after body parser
app.use(expressSanitizer());

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

app.post('/blogs', (req, res) => {
    const blog = req.body.blog;
    blog.body = req.sanitize(blog.body);
    BlogEntry.create(blog, (err, newBlogEntry) => {
        if (err) {
            console.err(`Error: ${err}`);
        } else {
            res.redirect('/blogs');
        }
    });
});

app.get('/blogs/new', (req, res) => {
    res.render('new');
});

app.get('/blogs/:id', (req, res) => {
    BlogEntry.findById(req.params.id, (err, blogEntry) => {
        if (err) {
            console.error(`Error: ${err}`);
        } else {
            res.render('show', {blog: blogEntry});
        }
    });
});

app.put('/blogs/:id', (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    BlogEntry.findByIdAndUpdate(req.params.id, req.body.blog, (err, blogEntry) => {
        if (err) {
            console.err(`Error: ${err}`);
        } else {
            res.redirect('/blogs/' + req.params.id, {blog: blogEntry});
        }
    });
});

app.get('/blogs/:id/edit', (req, res) => {
    BlogEntry.findById(req.params.id, (err, blogEntry) => {
        if (err) {
            console.err(`Error: ${err}`);
        } else {
            res.render('edit', {blog: blogEntry});
        }
    });
});

app.delete('/blogs/:id', (req, res) => {
    BlogEntry.findByIdAndRemove(req.params.id, (err) => {
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