require('dotenv').config()
var port = process.env.PORT || 3001;


//Node Core Modules
var path = require('path');
var bodyParser = require('body-parser');


//Auth modules
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var bcrypt = require('bcryptjs');

//Express Modules
var express = require('express');
var app = express();
app.use(express.static(path.join(__dirname, 'client/build')));


//DB Connections
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
var User = require('./models/User.js');


//Body Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



//AUTHENTICATION
passport.use(new LocalStrategy(
    function (username, password, done){
        User.findOne({username: username.toLowerCase()}, function (err, user) {
            if (err) return done(err);
            if (!user) {
                return done(null, false, {message: 'Incorrect Username.'});
            }
            if (!bcrypt.compareSync(password, user.password)){
                return done(null, false, {message: 'Incorrect Password'});
            }
            return done(null, user);
        });
    }
));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {maxAge: 1000*60*60*8},//ms*s*m*h
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(passport.initialize());
app.use(passport.session());
app.post('/api/login', passport.authenticate('local', {failureRedirect: '/login'}),
    function(req, res){
			  res.redirect('/dashboard');
    }
);
app.get('/api/logout', function(req, res){
	req.logout();
	res.send(true);
});








//ROUTES
app.get('/api/checkValidUser/:username', function(req, res){
	User.findOne({username: req.params.username}, function(err, user){
		if (err) throw err;
		res.send(user)
	})
})

app.post('/api/createUser', function(req, res){
	User.create({username: req.body.user, password: req.body.pass}, function(err, user){
		res.send("success")
	})
})










app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(port, function(){
    console.log('listening on port: ' + port)
});