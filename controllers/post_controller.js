const Post = require('../model/post');

module.exports.create_post = function(req, res){
    const newPost = Post.create({
        content : req.body.content,
        user : req.user._id
    });

    newPost.then((data)=>{
        console.log('A new post created successfully');
        return res.redirect('back');
    }).catch((err)=>{
        if(err){
            console.log('error in creating post ' , err);
            return res.redirect('back');
        }
    });
}