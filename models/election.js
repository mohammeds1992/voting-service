const mongoose = require('mongoose')

const ElectionSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	},
		lastUpdatedAt: {
		type: Date,
		required: true,
		default: Date.now
	},
})

module.exports = mongoose.model('Elections', ElectionSchema)