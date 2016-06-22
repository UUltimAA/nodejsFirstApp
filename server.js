var express = require('express');
var bodyParser= require('body-parser');
var app = express();

app.set('view engine', 'vash');
app.use(bodyParser.json());
app.use(express.static(__dirname + "/bower_components"));
app.use(require('./controllers/homepage.js'));
app.use(require('./controllers/calculator.js'));

app.use(require('./controllers/api.js'));
// app.use(express.static('./controllers/api.js'));
// app.use('/controllers/api/calc', function(req, res, next) {
//   console.log('Request URL:', req.originalUrl);
//   next();
// }, function (req, res, next) {
//   console.log('Request Type:', req.method);
//   next();
// });

var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log('Server has gone live');    
});
