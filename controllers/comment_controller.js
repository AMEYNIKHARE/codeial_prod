const Post = require('../model/post');
const Comment = require('../model/comment');

module.exports.create_comment = function (req, res) {
    const post = Post.findById(req.body.post).exec();
    post.then((data) => {
        if (data) {
            const comment = Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            comment.then((newComment) => {
                data.comments.push(newComment);
                data.save();
                req.flash('success' , 'Comment added successfully');
                return res.redirect('back');
            }).catch((error) => {
                if (error) {
                    req.flash('error' , error);
                    return res.redirect('back');
                }
            });
        }
        else {
            req.flash('error' , 'Invalid Post');
            return res.redirect('back');
        }
    }).catch((err) => {
        req.flash('error' , err);
        return res.redirect('back');
    });


};


module.exports.delete_comment = function (req, res) {

    Comment.findById(req.params.id).exec().then((data) => {
        if (data) {
            let postId = data.post;
            Comment.findByIdAndRemove(req.params.id).exec();
            req.flash('success' , 'Comment deleted successfully');
            // remove comment from post array
            Post.findById(postId).exec().then((newPost) => {
                if (newPost) {
                    Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }).exec();
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