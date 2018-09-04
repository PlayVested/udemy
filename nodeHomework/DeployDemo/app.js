const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

const IP = process.env.IP | 'localhost';
const PORT = process.env.PORT | '1979';
app.listen(PORT, IP, () => {
    console.log(`listening on ${IP}:${PORT}`);
});
