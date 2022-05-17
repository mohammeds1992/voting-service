const morgan = require('morgan')
const logger = require('../configuration/logger')
const bodyParser = require('body-parser')

module.exports = (app) => {

    app.use(bodyParser.json())

    app.use(morgan('combined', {
        stream: logger.stream
    }));
};