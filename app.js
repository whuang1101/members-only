var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// making sure all the dependencies are added
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs")
//hiding key using dotenv
require("dotenv").config();
const mongoDb = process.env.SECRET_KEY;
//connecting and throwing errors if mongoDB doesn't connect
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// defining the schemas to store in my database.
const User = require("./models/users")
const Messages = require("./models/messages");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const LocalStrategy = require("passport-local").Strategy;
passport.use(
    new LocalStrategy(async(username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        };
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
        return done(null, false, { message: "Incorrect password" })
        }
        return done(null, user);
      } catch(err) {
        return done(err);
      };
    })
  );

passport.serializeUser(function(user, done) {
done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
try {
    const user = await User.findById(id);
    done(null, user);
} catch(err) {
    done(err);
};
});
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
