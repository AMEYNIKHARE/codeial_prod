const Post = require('../model/post');
const Comment = require('../model/comment');
const User = require('../model/user');
const Like = require('../model/like');
const commentMailer = require('../mailers/comment_mailer');
const queue = require('../config/kue');
const queue_worker = require('../workers/email_worker');

module.exports.create_comment = async function (req, res) {
    try{
        const post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
    
            if (comment) {
                post.comments.unshift(comment);
                post.save();

                comment = await comment.populate('user', 'name email');
                // commentMailer.newComment(comment);

                let job = queue.create('emails' , comment).save(function(err){
                    if(err){
                        console.log('error in creating a queue ', err);
                        return;
                    }

                    console.log('Job enqueued ', job.id);
                });

                if(req.xhr){
                    return res.status(200).json({
                        data :{
                            comment : comment,
                        },
                        message : 'Comment Added'
                    })
                }
                req.flash('success' , 'Comment added successfully');
                return res.redirect('back');
            }
        }
    }
    catch(err){
        req.flash('error' , err);
        return res.redirect('back');
    }
    
};


module.exports.delete_comment = function (req, res) {

    Comment.findById(req.params.id).exec().then((data) => {
        if (data) {
            let postId = data.post;
            Comment.findByIdAndRemove(req.params.id).exec();
            Like.deleteMany({onModel : 'comment' , likeable : req.params.id}).exec();
            // remove comment from post array
            Post.findById(postId).exec().then((newPost) => {
                if (newPost) {
                    Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }).exec();
                    if(req.xhr){
                        return res.status(200).json({
                            data : {
                                comment_id : req.params.id
                            },
                            message : "Comment Deleted"
                        });
                    }
                    req.flash('success' , 'Comment removed from post');
                    return res.redirect('back');
                }
                else {
                    req.flash('error' , 'Error in removing comment from post');
                    return res.redirect('back');
                }
            }).catch((error) => {
                if (error) {
                    req.flash('error' , error);
                    return res.redirect('back');
                }
            });

        }
        else {
            req.flash('error' , 'Comment Not Found');
            return res.redirect('back');
        }
    }).catch((err) => {
        if (err) {
            req.flash('error' , err);
            return res.redirect('back');
        }
    });

};