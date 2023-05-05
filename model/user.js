const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const AVATAR_PATH = '/uploads/users/avatars';

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
    },

    avatar : {
        type : String
    }
},{
    timestamps : true
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname , '..' , AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});


user_schema.statics.uploadAvatar = multer({ storage: storage }).single('avatar');
user_schema.statics.avatarPath = AVATAR_PATH;

const user = mongoose.model('userData' , user_schema);

module.exports = user;