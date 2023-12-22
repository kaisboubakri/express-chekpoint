const express = require('express');
const app = express();
const port = 3000;

const workingHoursMiddleware = (req, res, next) => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hourOfDay = now.getHours();

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
        next();
    } else {
        res.send('Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).');
    }
};

app.use(workingHoursMiddleware);
app.use(express.static('public'));

// Define your routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/services', (req, res) => {
    res.sendFile(__dirname + '/public/services.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/public/contact.html');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
