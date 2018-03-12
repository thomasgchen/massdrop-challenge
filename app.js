var express = require('express');
var jobsController = require('./controllers/jobsController');
var bodyParser = require('body-parser');

var app = express();

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// fire controller
jobsController(app);

// listen to port
var port = 3000;
app.listen(port, function() {
  console.log('Listening to port', port);
});
