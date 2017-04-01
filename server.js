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
var MasterList = require('./models/MasterList.js');


//Body Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



//AUTHENTICATION
passport.use(new LocalStrategy(
    function (username, password, done){
        User.findOne({username: username.toLowerCase()}, function (err, user) {
            if (err) return done(err);
            if (!user) {
                return done(null, false);
            }
            if (!bcrypt.compareSync(password, user.password)){
                return done(null, false);
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
			  res.redirect('/profile');
    }
);
app.get('/api/logout', function(req, res){
	req.logout();
	res.send(true)
});








//ROUTES
//Create
app.post('/api/createUser', function(req, res){
	User.create({username: req.body.user, password: req.body.pass}, function(err, user){
		res.send("success")
	})
})
app.post('/api/addBook', function(req, res){
	User.findOne({username: req.user.username}, function(err, user){
		if (err) throw err;
		user.books.push(req.body)
		user.save(function(err){
			if (err) throw err;
		})
	})
	MasterList.create({title: req.body.title, thumbnail: req.body.thumbnail, owner: req.user.username})
})


//Read
app.get('/api/checkValidUser/:username', function(req, res){
	User.findOne({username: req.params.username}, function(err, user){
		if (err) throw err;
		res.send(user)
	})
})
app.get('/api/amiauthenticated', function(req, res){
	if (req.user) res.send(req.user)
	else res.send(false)
})
app.get('/api/getMasterList', function(req, res){
	MasterList.find({}, function(err, list){
		if (err) throw err;
		res.send(list)
	})
})


//Update
app.put('/api/updateProfile', function(req, res){
	User.findOneAndUpdate({username: req.user.username}, req.body, function(err){
		if (err) throw err;
		res.send(true)
	})
})
app.put('/api/submitTradeRequest', function(req, res){
	MasterList.findOne({title: req.body.tradeBook, owner: req.body.tradeOwner}, function(err, book){
		if (err) throw err;
		console.log(book)
		book.trade = [req.body.requestedBy, req.body.tradeFor]
		book.save(function(err){
			if (err) throw err;
			res.send('success!')
		})
	})
})
app.put('/api/acceptTrade', function(req, res){
	res.send('success!')
})

//Delete








app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(port, function(){
    console.log('listening on port: ' + port)
});