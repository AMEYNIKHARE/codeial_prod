const Post = require('../model/post'); 
const Comment = require('../model/comment'); 

module.exports.create_comment = function(req, res){
    const post = Post.findById(req.body.post).exec();
    post.then((data)=>{
        if(data){
            const comment = Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            });

            comment.then((newComment)=>{
                data.comments.push(newComment);
                data.save();
                return res.redirect('back');
            }).catch((error)=>{
                if(error){
                    console.log('error in creating comment ', err);
                    return res.redirect('back');
                }
            });
        }
        else{
            console.log('Invalid Post');
            return res.redirect('back');
        }
    }).catch((err)=>{
        console.log('error in finding post while adding comment ' , err);
        return res.redirect('back');
    });

    
};