var port = process.env.PORT || 3001;

var path = require('path');

var express = require('express');
var app = express();
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(port, function(){
    console.log('listening on port: ' + port)
});