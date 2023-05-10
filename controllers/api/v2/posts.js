module.exports.index = function(req, res){
    return res.json(200 , {
        message : 'API sun successfully for V2',
        posts : []
    });
};