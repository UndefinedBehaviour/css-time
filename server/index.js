const express = require('express');
const path = require("path");

const port = 3000;

const app = express();
app.set('trust proxy', true);
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, '..'));

app.use(express.static(path.join(__dirname, '..')));

app.get('/', async (req, res) => {
    let clockOffset = 0;
    try {
        const response = await fetch(`http://ip-api.com/json/${req.ip}`);
        const tz = (await response.json()).timezone || 'GMT';
        clockOffset = getCurrentTimeInTimezone(tz);
    } catch(e) {
        console.log(e);
    }
    res.render('./index', { clockOffset })
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});

function getCurrentTimeInTimezone(timeZone) {
    options = { timeZone,  hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const dateTime = new Date().toLocaleString([], options);
    [, h, m, s ] = dateTime.match(/(\d+):(\d+):(\d+)/);
    return 60 * (60 * h + +m) + +s;
  }