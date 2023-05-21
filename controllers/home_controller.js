const Post = require('../model/post');
const User = require('../model/user');
const Like = require('../model/like');
const Frinendship = require('../model/friendship');

// renders home page
module.exports.home = async function(req, res){
    // console.log(req.cookies);
    // res.cookie('UserID' , 'ANIKHARE');
    // res.cookie('Name' , 'Amey Nikhare');
    // const allPost = Post.find({}).populate('user').populate('comments').exec();
    
    try{
        const allPost = await Post.find({}).sort('-createdAt').populate('user').populate('likes').populate({path : 'comments', populate : {path : 'user'}});
        if(allPost){
            const allUser = await User.find({});
            const currentUser = await User.findById(req.user._id).populate(
                {path : 'friends' , 
                populate : {path : 'from_user to_user'}
            });
            console.log(currentUser);
            return res.render('home' , {posts : allPost, users : allUser, friends : currentUser.friends});        
        }
    }   
    catch(err){
        req.flash('error' , err);
        console.log('error in rendering home page ' , err);
        return;
    };
    
}

module.exports.default = function(req, res){
    return res.render('default');
}
