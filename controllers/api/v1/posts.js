const Post = require('../../../model/post');
const Comment = require('../../../model/comment');


module.exports.index = async function(req, res){
    const allPost = await Post.find({}).sort('-createdAt').populate('user').populate({path : 'comments', populate : {path : 'user'}});

    return res.json(200 , {
        message : 'API run successfully for V1',
        posts : allPost
    });
};

module.exports.delete_post = async function(req, res){
    try{
        const post = await Post.findById(req.params.id);
            if(post){
                await Post.findByIdAndRemove(req.params.id);
                await Comment.deleteMany({post : req.params.id});
                
                return res.json(200 , {
                    message : "Post and associated comments deleted"
                });
            }
            else{
                return res.json(500 , {
                    message : "Post Not Found"
                });
            }
    }
    catch(err){
        if(err){
            console.log('error in finding post while deleting it ', err)
            return res.json(500 , {
                message : "Internal Server Error"
            });
        }
    };
};