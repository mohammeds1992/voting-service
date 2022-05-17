const express = require('express')
const middleware = require('./middlewares')
const createError = require('http-errors')
const routes = require('./routes')
const app = express();
const logger = require('./configuration/logger')
const mongoose = require('mongoose')
var db = require('./configuration/db')();

middleware(app)
routes(app)




/*mongoose
 .connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 })
 .then((db) => console.log("db is connected"))
 .catch((err) => console.log(err));*/


app.use((req, res, next) => {
    let url = 'http://' + process.env.HOST + '/v1/events'
    res.setHeader("Content-Type", "text/html")
    res.send(`
             <html>
                <body>
                    <h1>Welcome to voting service.
                    </h1>
                </body>
            </html>
            `)
})

app.use(
    (error, req, res, next) => {
        logger.error(error.message);
        res.statusCode = error.statusCode;
        res.json({
            message: error.message
        });
    });



module.exports = app;

