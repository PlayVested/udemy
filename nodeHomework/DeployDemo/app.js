const express = require(`express`);
const app = express();

app.set(`view engine`, `ejs`);

app.get(`/`, (req, res) => {
    console.log(`I'm home!`);
    res.render(`home`);
});

app.get(`/about`, (req, res) => {
    console.log(`What is this all about?`);
    res.render(`about`);
});

const PORT = process.env.PORT || 1979;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
