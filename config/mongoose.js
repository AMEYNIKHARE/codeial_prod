const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/codeial_development');

const db = mongoose.connection;

db.on('error' , console.error.bind(console , 'errorin connecting to DB'));
db.once('open' , ()=>{
    console.log('connection to DB successfully :: MongoDB');
});

module.exports = db;