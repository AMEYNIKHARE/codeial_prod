const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    content: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userData'
    },

    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]

}, {
    timestamps: true
});

const post = mongoose.model('post', postSchema);

module.exports = post;