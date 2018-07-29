const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

// 'body-parse' takes form data and builds a JS object out of it that we can manipulate
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('home');
});

var friends = [
    'JT',
    'Cory',
    'Tom',
    'Joe'
];

app.get('/friends', (req, res) => {
    res.render('friends', {friends: friends});
});

app.post('/addFriend', (req, res) => {
    const newFriend = req.body.newFriend;
    friends.push(newFriend);
    res.redirect('/friends');
});

app.listen(1979, 'localhost', () => {
    console.log(`listening on port 1979`);
});