require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
var methodOverride = require('method-override');
const app = express();

app.use(methodOverride('_method'))

const initializeRoutes = require('./routes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('combined'));
app.use('/css',express.static(path.join(__dirname, 'assets/css')));
app.use('/js',express.static(path.join(__dirname, 'assets/js')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

initializeRoutes(app);

app.listen(process.env.PORT, () => {
       console.log(`Listening on port ${process.env.PORT}`);
});