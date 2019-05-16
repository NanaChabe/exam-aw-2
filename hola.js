//create an app of express
var express = require('express');

//variable for save and posterior usage of url
var path = require('path');

//add file containing relation between jquery functions and nodejs eventes
var routes = require('./routes/index');

//initialize the app
var app = express();

//disable cache for developper purposes
app.disable('view cache');
app.set('etag', false);

//specifique public directories for browser use
app.use(express.static(path.join(__dirname + '/public'), { etag: false} ));

//define engine for tmeplates
app.set("view engine","jade");

//call al the needed functions
app.get('/', routes.index);
app.get('/variables', routes.variables);

//send respond to body
app.listen(7000);
