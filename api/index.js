import express from 'express';
import path from 'path';

const port = 3000;

const app = express();
app.set('trust proxy', true);
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'templates'));
app.use(express.static(path.join(process.cwd(), 'assets')));

app.get('/', async (req, res) => {
    let clockOffset = 0;
    try {
        const response = await fetch(`http://ip-api.com/json/${req.ip}`);
        const tz = (await response.json()).timezone || 'GMT';
        clockOffset = getClockOffsetFromTimezone(tz);
    } catch(e) {
        console.log(e);
    }
    res.render('index', clockOffset);
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

function getClockOffsetFromTimezone(timeZone) {
    const options = { timeZone,  hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const [, hour, minute, second ] = new Date().toLocaleString([], options).match(/(\d+):(\d+):(\d+)/);
    return { hour, minute, second };
}
