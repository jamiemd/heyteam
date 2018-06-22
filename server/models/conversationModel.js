const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ConversationSchema = new mongoose.Schema({
	uid: {type: ObjectId, ref: 'User'},
	title: {type: String, required: true},
	schedule_days: [{type: Number}],
	time: {type: Number},
 	question: {type: String},
 	participants: [{type: mongoose.Schema.Types.Mixed}],
	responses: [{type: ObjectId, ref: 'Response'}],
	active: {type: Boolean, default: true},
	created_on: {type: Number, default: Date.now()},
	daySent: {type: Number, default: null}
});

const ConversationModel = mongoose.model('Conversation', ConversationSchema);

module.exports = ConversationModel;
