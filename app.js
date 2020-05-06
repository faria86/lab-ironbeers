const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'views')));

//hbs.registerPartials()
// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (request, response) => {
  punkAPI
    .getBeers()
    .then(arrayOfBeers => {
      console.log('Beers are working'); 
      response.render('beers', { beers: arrayOfBeers });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/random-beers', (request, response) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      console.log('Get random is working');
      response.render('random-beer', { beer: randomBeer[0] });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
