const Post = require('../model/post');

// renders home page
module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('UserID' , 'ANIKHARE');
    // res.cookie('Name' , 'Amey Nikhare');
    // const allPost = Post.find({}).populate('user').populate('comments').exec();
    const allPost = Post.find({}).populate('user').populate({path : 'comments', populate : {path : 'user'}}).exec();

    allPost.then((data)=>{
        return res.render('home' , {posts : data});
    }).catch((err)=>{
        console.log('error in rendering home page ' , err);
        return;
    });
    
}

module.exports.default = function(req, res){
    return res.render('default');
}
