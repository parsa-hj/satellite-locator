const express = require('express')
const path = require('path'); 
const app = express()
const axios = require('axios');
const port = 4000

require('dotenv').config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

app.get('/', async (req, res) => {
    try{
        const response = await axios.get("https://api.wheretheiss.at/v1/satellites/25544");
        const data = response.data;
        const lat = data.latitude;
        const long = data.longitude;

        res.render('main', { GOOGLE_MAPS_API_KEY, lat, long });
    } catch (error) {
        console.error("Error fetching data: ", error);
        res.status(500).send('Error fetching ISS location. Please try again later.');
    }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})