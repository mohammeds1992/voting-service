const electionsRouter = require('./elections')

module.exports = (app) => {
	app.use('/v1/elections', electionsRouter);
};