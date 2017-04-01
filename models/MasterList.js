var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var masterListSchema = new Schema({
    thumbnail: String,
    title: String,
    owner: String,
    trade: Array //details of the trader [username, title]
});

var MasterList = mongoose.model('MasterList', masterListSchema);
module.exports = MasterList;