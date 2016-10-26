var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProviderSchema = new Schema({
	firstName: String,
	lastName: String,
	userName: { type: String, unique: true, required: true },
	email: { type: String, unique: true, required: true },
	url: String,
	password: { type: String, required: true },
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
	services:[{	//	TODO should be lowercase but doesn't work instead using RegExp
		fee: { type: Number, default: 0 },		
		anytime: { type: Boolean, default: true	},
		active: { type: Boolean, default: true	},
		city: { type: Array, lowercase: true },
		dates: [Date],
		task: { type: Array, lowercase: true }
	}],
	todos: [{
		task : String,
		city: String,
		date: Date,
		time: String,
		description: String,
		status: {
				available: { type: Boolean, default: false },
				confirmed: { type: Boolean, default: false },
				receiver: String,
				done: { type: Boolean, default: false }
		}
	}],
	createdAt: Date,
	updatedAt: Date
});


// Custom method that runs before every save
ProviderSchema.pre('save', function(next) {
	this.updatedAt = new Date();
	// if created_at doesn't exist, add to that field
	if (!this.createdAt)
		this.createdAt = new Date();
	next();	//	important !!
})
// http://stackoverflow.com/questions/11761819/mongoose-jobschema-preupdate-functionnn-throws-typeerror-cannot-rea
// // Custom method that runs before every update
// ProviderSchema.pre('update', function(next) {
// 	// status.selected = true if services anytime = true
// 	if(this.todos) {
// 		this.todos.status.selected = this.services.anytime;	
// 	}
// 	next();	//	important !!
// })


var Provider = mongoose.model('Provider', ProviderSchema);
module.exports = Provider;