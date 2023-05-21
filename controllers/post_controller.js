const Post = require('../model/post');
const Comment = require('../model/comment');
const User = require('../model/user');
const Like = require('../model/like');

module.exports.create_post = async function(req, res){
    try{
        let newPost = await Post.create({
            content : req.body.content,
            user : req.user._id
        });
    
        if(req.xhr){
            newPost = await newPost.populate('user' , 'name');
            return res.status(200).json({
                data : {
                    post : newPost,
                },
                message : 'Post Created'
            });
        }
        
        req.flash('success' , "New Post Created Successfully");
        console.log('A new post created successfully');
        return res.redirect('back');
    }
    catch(err){
        if(err){
            req.flash('error' , err);
            console.log('error in creating post ' , err);
            return res.redirect('back');
        }
    }
};

module.exports.delete_post = async function(req, res){
    try{
        const post = await Post.findById(req.params.id);
        if(post){
            await Like.deleteMany({onModel : 'post' , likeable : req.params.id});
            await Like.deleteMany({likeable : {$in : post.comments}});
            await Comment.deleteMany({post : req.params.id});
            await Post.findByIdAndRemove(req.params.id);

            if(req.xhr){
                return res.status(200).json({
                    data : {
                        post_id : req.params.id
                    },
                    message : 'Post Deleted'
                });
            }
            req.flash('success' , 'Post deleted');
            return res.redirect('back');
        }
        else{
            req.flash('error' , 'post not found');
            return res.redirect('back');
        }
    }catch(err){
        if(err){
            req.flash('error' , err);
            console.log('error in finding post while deleting it ', err)
            return res.redirect('back');
        }
    };

};