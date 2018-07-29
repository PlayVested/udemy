const express = require("express");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs")

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/fallinlovewith/:thing", (req, res) => {
    var thing = req.params.thing;
    var listContent = [
        'puppy',
        'kid',
        'monkey'
    ];
    res.render("love", {thingVar: thing, listContent: listContent});
});

// this is coming from cloud9
app.listen(process.env.PORT, process.env.IP, function () {
    console.log(`server has started on port ${process.env.PORT} at ${process.env.IP}`);
});
