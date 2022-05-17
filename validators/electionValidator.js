const Joi = require('@hapi/joi')

const electionSchema = Joi.object({
	title: Joi.string().required().min(3).max(100)
});

module.exports = { electionSchema }