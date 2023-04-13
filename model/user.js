const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    email : {
        type : String,
        require : true,
        unique : true
    },

    password : {
        type : String,
        require : true
    },

    name :{
        type : String,
        require : true
    }
},{
    timestamps : true
});

const user = mongoose.model('user_data' , user_schema);

module.exports = user;