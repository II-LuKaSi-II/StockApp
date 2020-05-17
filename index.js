//This is an app to teach me how to pull stock information (or any information) from an API.

const express = require('express');
const app = express();
var exphbs  = require('express-handlebars');
const path = require('path');

//This allows for the webhost to use whatever port they want, or 5000
const PORT = process.env.PORT || 5000;

//Set handlebars middleware. Handlebars allows for dynamic pages.
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = 'This is just to show how we can pass variables into the handlebars routes to display it on the front end'

//Set Handlebar routes
app.get('/', function (req, res) {
    res.render('home', {
        // We can put stuff in here on the backend that will then get routed though handlebars to our front end 
        stuff: otherstuff
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