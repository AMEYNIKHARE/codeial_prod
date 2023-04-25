const Post = require('../model/post');
const Comment = require('../model/comment');

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
};

module.exports.delete_post = function(req, res){
    
    Post.findById(req.params.id).exec().then((data)=>{
        if(data){
            Post.findByIdAndRemove(req.params.id).exec();
            Comment.deleteMany({post : req.params.id}).exec();
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }).catch((err=>{
        if(err){
            console.log('error in finding post while deleting it ', err)
            return res.redirect('back');
        }
    }));

 
};