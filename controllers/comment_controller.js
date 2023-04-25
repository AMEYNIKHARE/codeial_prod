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
                return res.redirect('back');
            }).catch((error) => {
                if (error) {
                    console.log('error in creating comment ', err);
                    return res.redirect('back');
                }
            });
        }
        else {
            console.log('Invalid Post');
            return res.redirect('back');
        }
    }).catch((err) => {
        console.log('error in finding post while adding comment ', err);
        return res.redirect('back');
    });


};


module.exports.delete_comment = function (req, res) {

    Comment.findById(req.params.id).exec().then((data) => {
        if (data) {
            let postId = data.post;
            Comment.findByIdAndRemove(req.params.id).exec();
            // remove comment from post array
            Post.findById(postId).exec().then((newPost) => {
                if (newPost) {
                    Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }).exec();
                    return res.redirect('back');
                }
                else {
                    return res.redirect('back');
                }
            }).catch((error) => {
                if (error) {
                    console.log('error in finding post while deleting comments frompost aaray ', error)
                    return res.redirect('back');
                }
            });

        }
        else {
            return res.redirect('back');
        }
    }).catch((err) => {
        if (err) {
            console.log('error in finding comment while deleting it ', err)
            return res.redirect('back');
        }
    });

};