const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const hbs = require('express-handlebars');
const hostname = 'localhost';
const port = 3000;

const indexRouter = require('./routes/index')

const logger = require('./middleware/logger');

const app = express();
  

//Template Engines
app.engine('hbs', hbs({ extname: 'hbs' }))
app.set('view engine', 'hbs');

//Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger);

//Routes
app.use('/', indexRouter)

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/signinPage`);
});