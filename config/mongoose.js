const mongoose = require('mongoose');
const env = require('./environment');
const path = require('path');

mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error' , console.error.bind(console , 'errorin connecting to DB'));
db.once('open' , ()=>{
    console.log('connection to DB successfully :: MongoDB');
});

module.exports = db;
