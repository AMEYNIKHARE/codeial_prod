const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'userData'
    },

    likeable : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        refPath : 'onModel'
    },

    onModel : {
        type : String,
        required : true,
        enum : ['post' , 'comment']
    }

},{
    timestamps : true
});

const like = mongoose.model('like', likeSchema);

module.exports = like;