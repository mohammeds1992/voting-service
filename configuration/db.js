const {
    connect,
    connection
} = require('mongoose');

module.exports = () => {
    const uri = process.env.DB_URI;

    connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log('Connection estabislished with MongoDB');
        })
        .catch(error => console.error('Connection estabislished with MongoDB failed :: ' + error.message));
}