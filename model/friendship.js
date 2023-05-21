const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({

    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userData'
    },

    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userData'
    }
}, 
{
    timestamps: true
});


const friendship = mongoose.model('friendship', friendshipSchema);

module.exports = friendship;