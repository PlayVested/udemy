var express = require("express");
var app = express();

// req contains all the info that 
app.get('/', function (req, res) {
    res.send('hi there :)');
});

app.get('/bye', function (req, res) {
    res.send('goodbye!');
});

app.get('/many/:category', function(req, res) {
    res.send(`This is the '${req.params.category}' category`);
});

app.get('*', function (req, res) {
    res.send('Generic response');
});

// this is coming from cloud9
app.listen(process.env.PORT, process.env.IP, function () {
    console.log(`server has started on port ${process.env.PORT} at ${process.env.IP}`);
});
