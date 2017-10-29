// DEPENDENCIES  
const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

    // auth dependencies
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

// CONFIG APP
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
  console.log(`Server connected to PORT: ${PORT}`);
})

    //setup views  
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

    //middleware
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());

//paths
app.get('/', (req,res) => {
  res.send('hello world');
})

app.get('/about', (req, res) => {
  res.send('make an about page');
})

//paths to routers here
//auth router
//user routes
//rooms

app.get('*', (req,res) => {
  res.status(404).send('Error 404: Path not found');
})