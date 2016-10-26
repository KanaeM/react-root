var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// request db
var db = require('../db');

var ReceiverSchema = new Schema({
	firstName: String,
	lastName: String,
	userName: { type: String, unique: true, required: true },
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	url: String,
	address1: { type: String },
	address2: String,
	city: { type: String },
	state: { type: String },
	zip: { type: String, required: true },
	phone: {
		type: String,
		validate: {
			validator: function(v) {
				return /\d{3}-\d{3}-\d{4}/.test(v);
			},
			message: '{VALUE} is not a valid phone number!'
		},
		required: [true, 'Phone number required']
	},
	requests: [
		{
			task: String,
			city: String,
			date: Date,
			time: String,
			description: String,
			status: { 
				//	true if Receiver select a provider from providers array
				confirmed: { type: Boolean, default: false },
				provider: String,
				done: { type: Boolean, default: false }
			},
			providers: [	// all potential providers
				{
					provider: String,
					available: Boolean 	// Only True
				}
			]

		}
	],
	createdAt: Date,
	updatedAt: Date

});

// Custom method that runs before every save
ReceiverSchema.pre('save', function(next) {
	this.updatedAt = new Date();
	// if created_at doesn't exist, add to that field
	if (!this.createdAt)
		this.createdAt = new Date();
	next(); //  important !!
})

var Receiver = mongoose.model('Receiver', ReceiverSchema);

module.exports = Receiver;