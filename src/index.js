// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startDatabase} = require('./database/mongo');
const {insertAd, getAds} = require('./database/ads');
const {deleteAd, updateAd} = require('./database/ads');

// defining the express application
const app = express()

// temporary database - used for testing the code
// const ads = [
//     { title: 'hello world (again!)' }
// ]

// middleware
app.use(helmet());
app.use(bodyParser.json()); // parses 
app.use(cors());
app.use(morgan('combined'));


app.get('/', async (req, res) => { // fetch request home link
    res.send(await getAds()); // response is the getAds function imported from ads.js
  });

app.post('/', async (req, res) => { // post endpoint that points to index page
    const newAd = req.body; // declare newAd with the request body (body property to the request)
    await insertAd(newAd); // calls insertAd function with the req.body parameter(newAd) 
    res.send({ message: 'New ad inserted.'}) // response message
})

app.delete('/:id', async (req, res) => { // first value (URL segment) passed in is route path, which is appended to home link
    await deleteAd(req.params.id); // syntax defines route parameters in the route mentioned || naming the route parameter specifies route target (.id)
    res.send({ message: 'Ad removed.'}); // response of the request is this message

});

app.put('/:id', async (req, res) => { // update endpoint that looks for route path, which is the id value
    const updatedAd = req.body; // gives details of ad being updated from the request body
    await updateAd(req.params.id, updatedAd); // calls updateAd function (imported), specifics which id is targeted, and passes in updatedAd request body as new values
    res.send({ message: 'Ad updated.'})
    console.log(req.params.id);
})

startDatabase().then(async () => { // startDatabase method called (imported) and then returns the promise of the async/await function
    await insertAd({title: 'hello, now from the in-memory database!'}) // after database started, insertAd function called - object of "title" passed as parameter

app.listen(4000, async () => { // listening to port
    console.log('listening on port 4000...');
    })
});
