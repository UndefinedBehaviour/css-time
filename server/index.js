const express = require('express');
const path = require("path");
const http = require("http");

const port = 3000;

const app = express();
//app.set('trust proxy', true);
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, '..'));

app.use(express.static(path.join(__dirname, '..')));

app.get('/', async (_, res) => {
    res.render('./index')
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});