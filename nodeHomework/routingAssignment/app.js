var express = require("express");
var app = express();

// req contains all the info that 
app.get('/', function (req, res) {
    res.send('Hi there, welcome to my assignment!');
});

app.get('/speak/:animal', function (req, res) {
    const animalNoises = {
        cow: 'Moo',
        pig: 'Oink',
        dog: 'Woof Woof',
        bird: 'Chirp',
        snake: 'Ssssssss'
    };
    
    const animal = req.params.animal.toLowerCase();
    const noise = animalNoises[animal];
    if (noise) {
        res.send(`The ${animal} says '${noise}'`);
    } else {
        res.send(`I don't know what a ${animal} says, sorry`);
    }
});

app.get('/repeat/:phrase/:count', function (req, res) {
    let output = '';
    const count = parseInt(req.params.count);
    console.log(count);
    if (count && !isNaN(count)) {
        const phrase = req.params.phrase + ' ';
        for (let i = 0; i < count; i++) {
            output += phrase;
        }
        res.send(output);
    } else {
        res.send(`this space intentionally left blank`);
    }
});

app.get('*', function(req, res) {
    res.send('Sorry, page not found... what are you doing with your life?')
});

// this is coming from cloud9
app.listen(process.env.PORT, process.env.IP, function () {
    console.log(`server has started on port ${process.env.PORT} at ${process.env.IP}`);
});
