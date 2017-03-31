require('dotenv').config()


var port = process.env.PORT || 3001;

var path = require('path');

var passport = require('passport');
var FacebookStrategy = require('passport-facebook');

var express = require('express');
var app = express();
app.use(express.static(path.join(__dirname, 'client/build')));




//AUTHENTICATION
passport.use(new FacebookStrategy({
	clientID: 1314472515300760,
	cleintSecret: 7aeb8f0c04f03b73c5681101a33fdce9,

}))





















app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(port, function(){
    console.log('listening on port: ' + port)
});