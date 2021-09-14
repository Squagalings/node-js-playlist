var express = require('express');
var todoControllers = require('./controllers/todoControllers.js')

var app = express();

// SET UP TEMPLATE ENGINE
app.set('view engine', 'ejs');

// STATIC FILES
app.use(express.static('./public'));

// FIRE CONTROLLERS
todoControllers(app);

// LISTEN TO PORT
app.listen(3000);
console.log('You are listening to port 3000');






//////////////////////////////////////////////
//////////////////////////////////////////////
// localhost:3000/assets/styles.css
//////////////////////////////////////////////
//////////////////////////////////////////////