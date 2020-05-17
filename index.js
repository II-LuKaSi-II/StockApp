//This is an app to teach me how to pull stock information (or any information) from an API. 
//This is the javascript that is being run on the back end with node, using the express framework

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

//This allows for the webhost to use whatever port they want, or 5000
const PORT = process.env.PORT || 5000;

//use body parser middleware to parse out what the form from the homepage has sent in
app.use(bodyParser.urlencoded({extended: false}));

//API Key: pk_32b83d1e7ecb4c229b342146677133aa
//create call-api function
function call_api(finishedAPI, ticker) {
//This request call is what grabs the info from the API, which we have now turned into a function that we can call, allowing that info to have global scope (maybe?)
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_32b83d1e7ecb4c229b342146677133aa',{ json: true }, (err, res, body) => {
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

//Set Handlebar index GET routes. There are differnet types of routes like GET and POST
app.get('/', function (req, res) {
    call_api(function(doneAPI) {
            res.render('home', {
            // We can put stuff in here on the backend that will then get routed though handlebars to our front end 
            stock: doneAPI
        });
    }, "fb");  
});

//Set Handlebar index POST routes. There are differnet types of routes like GET and POST
app.post('/', function (req, res) {
    call_api(function(doneAPI) {
            // this postedstuff variable uses the req from the function, the body fro the bodyParser and then the name of the input form.
            // If there were multiple forms you would access them by calling them after body by the name you gave them. 
            //posted_stuff = req.body.stock_ticker; **this is how you access the parsed info from form. 
            res.render('home', {
            // We can put stuff in here on the backend that will then get routed though handlebars to our front end 
            stock: doneAPI,
        });
    }, req.body.stock_ticker);  
     
});

// Create about page GET route 
app.get('/about.html', function (req, res) {
    res.render('about');
});

//We have static webpage 'index.html' Now we need to create a path and a route to that page. 
//That is done through the static folder 'public'
//This is the only node 'routing' we need to do for all static pages. This is thanks to express js
app.use(express.static(path.join(__dirname, 'public')));

//This makes the Server listen on that port
app.listen(PORT, () => console.log('Serving Listening on Port ' + PORT));