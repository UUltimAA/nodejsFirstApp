var express = require('express');
var bodyParser= require('body-parser');
var app = express();

app.set('view engine', 'vash');
app.use(bodyParser.json());
app.use(require('./controllers/homepage.js'));
app.use(require('./controllers/calculator.js'));
app.use(require('./controllers/api.js'));

app.listen(3000, function(){
    console.log('Server has gone live');    
});
