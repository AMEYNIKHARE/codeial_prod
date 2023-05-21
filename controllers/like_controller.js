const Post = require('../model/post');
const Comment = require('../model/comment');
const Like = require('../model/like');


module.exports.toggleLike = async function(req, res){

    try{
        let deleted = false;
        let likeable;

        if(req.query.type == 'post'){
            likeable = await Post.findOne({_id : req.query.id});
        }
        else{
            likeable = await Comment.findOne({_id : req.query.id});
        }
        // console.log(likeable);
        const existingLike = await Like.findOne({
            user : req.user._id,
            onModel : req.query.type, 
            likeable : req.query.id
        });

        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            deleted = true;
            await Like.findByIdAndRemove(existingLike._id);
        }
        else{
            const newLike = await Like.create({
                user : req.user._id,
                onModel : req.query.type,
                likeable : req.query.id
            });

            likeable.likes.unshift(newLike);
            likeable.save();
        }

        if(req.xhr){
            return res.status(200).json({
                data : {
                    likeable : likeable
                },
            });
        }
    }
    catch(err){
        req.flash('error' , err);
        return;
    }

    
    return res.redirect('back');
};