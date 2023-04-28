const Post = require('../model/post');
const User = require('../model/user');

// renders home page
module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('UserID' , 'ANIKHARE');
    // res.cookie('Name' , 'Amey Nikhare');
    // const allPost = Post.find({}).populate('user').populate('comments').exec();
    const allPost = Post.find({}).populate('user').populate({path : 'comments', populate : {path : 'user'}}).exec();

    allPost.then((data)=>{
        const allUser = User.find({}).exec().then((all_users)=>{
            return res.render('home' , {posts : data, users : all_users});
        }).catch((error)=>{
            req.flash('error' , error);
            console.log('error in fetching all users ', error);
            return res.render('home' , {posts : data});
        });
        
    }).catch((err)=>{
        req.flash('error' , err);
        console.log('error in rendering home page ' , err);
        return;
    });
    
}

module.exports.default = function(req, res){
    return res.render('default');
}
