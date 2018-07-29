const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

app.set('view engine', 'ejs');

// 'body-parse' takes form data and builds a JS object out of it that we can manipulate
app.use(bodyParser.urlencoded({extended: true}));

/*
// this is a simple request to get the sunset time in Hawaii
request('https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', (error, response, body) => {
    if (error) {
        console.log('Something went wrong');
    } else if (response.statusCode == 200) {
        console.log('looks like all is well');
        const parsedData = JSON.parse(body);
        console.log(`The next sunset in Hawaii is ${parsedData.query.results.channel.astronomy.sunset}`);
    }
});
*/

// General search: http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb
// Search with Movie ID: http://www.omdbapi.com/?i=tt3896198&apikey=thewdb

app.get('/', (req, res) => {
    res.render('search');
});

app.get('/results', (req, res) => {
    const search = req.query.search;
    request(`http://www.omdbapi.com/?s=${search}&apikey=thewdb`, (error, response, body) => {
        if (error) {
            console.log('Something went wrong');
        } else if (response.statusCode == 200) {
            // res.send('I got a response!');
            const parsedData = JSON.parse(body);
            res.render('results', {data: parsedData});
        }
    });
});

app.listen(1979, 'localhost', () => {
    console.log(`listening on port 1979`);
});
