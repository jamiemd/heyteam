const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ResponseSchema = new mongoose.Schema({
	username: {type: String, required: true},
	conversation: {type: ObjectId, ref: 'Conversation'},
	question: {type: ObjectId, ref: 'Question'},
	answers:[{type: mongoose.Schema.Types.Mixed}],
	date_submitted: {Type: Date},
});

const ResponseModel = mongoose.model('Response', ResponseSchema);

module.exports = ResponseModel;