// Create an Express application
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const env = require('./config/environment');
const port = process.env.PORT || 8000;
const app = express();

// Connect to the database
const db = require(env.db_path);

// Initialize flash messages
const flash = require('connect-flash');

// Initialize session middleware
const session = require('express-session');
const mongoStore = require('connect-mongo');

// Initialize passport authentication
const passport = require('passport');
const passportLocal = require(env.passport_path);

// Load custom middleware
const customMware = require(env.customMware_path);

// Configure Express
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expressLayout);
app.use(express.static(env.assets_path));

// Configure session middleware
app.use(session({
  name: 'placementCell',
  secret: env.secret_key,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: (1000 * 60 * 100), // 100 minutes
  },
  store: mongoStore.create({
    mongoUrl: env.mongoose_path,
    ttl: 14 * 24 * 60 * 60, // 14 days
  }),
}));

// Initialize passport authentication
app.use(passport.initialize());
app.use(passport.session());

// Initialize flash messages
app.use(flash());
app.use(customMware.setFlash);

// Load routes
app.use('/', require('./route/index'));

// Start the server
app.listen(port, () => {
  if (error) {
    console.log('Error in running server');
  }
  console.log('Server is running');
});
