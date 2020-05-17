//This is an app to teach me how to pull stock information (or any information) from an API.

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');

//This allows for the webhost to use whatever port they want, or 5000
const PORT = process.env.PORT || 5000;

//API Key: pk_32b83d1e7ecb4c229b342146677133aa
function call_api(finishedAPI) {
//This request call is what grabs the info from the API, which we have now turned into a function that we can call, allowing that info to have global scope (maybe?)
    request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_32b83d1e7ecb4c229b342146677133aa',{ json: true }, (err, res, body) => {
    if (err) {return console.log(err);}
    if (res.statusCode === 200) {
        // console.log(body)
        finishedAPI(body)
        };
// A status code of 200 means everything came back good
    });    
};


//Set handlebars middleware. Handlebars allows for dynamic pages.
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = 'This is just to show how we can pass variables into the handlebars routes to display it on the front end'

//Set Handlebar routes
app.get('/', function (req, res) {
    call_api(function(doneAPI) {
            res.render('home', {
            // We can put stuff in here on the backend that will then get routed though handlebars to our front end 
            stock: doneAPI
        });
    });  
});

// Create about page route 
app.get('/about.html', function (req, res) {
    res.render('about');
});

//We have static webpage 'index.html' Now we need to create a path and a route to that page. 
//That is done through the static folder 'public'
//This is the only node 'routing' we need to do for all static pages. This is thanks to express js
app.use(express.static(path.join(__dirname, 'public')));

//This makes the Server listen on that port
app.listen(PORT, () => console.log('Serving Listening on Port ' + PORT));