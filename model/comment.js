const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    content : {
        type : String,
        required : true
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'userData'
    },

    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'post'
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'like'
        }
    ]

},{
    timestamps : true
});

const comment = mongoose.model('comment' , commentSchema);

module.exports = comment;