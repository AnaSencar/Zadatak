var express = require('express');
require('express-async-errors');
const methodOverride = require('method-override');
var app = express();
var machineController = require('./controllers/machineController');

app.set('view engine', 'ejs');
app.use(express.static('./front'));
app.use(methodOverride('_method'));
machineController(app);
app.listen(3000);
console.log('listening to 3000');
