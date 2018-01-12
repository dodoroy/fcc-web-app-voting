'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	id: String,
	userid: String,
	pollname: String,
	options: Schema.Types.Mixed //{"aa":2,"b":3}
});

module.exports = mongoose.model('Poll', Poll);
