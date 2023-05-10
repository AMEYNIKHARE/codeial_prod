const User = require('../../../model/user');
const jsonToken = require('jsonwebtoken');


module.exports.create_session = async function(req, res){

    try{
        const user = await User.findOne({email : req.body.email});

        if(!user || user.password != req.body.password){
            return res.json(422, {
                message : 'invalid username or password'
            });
        }
    
        return res.json(200,{
            message : 'User logged in successfully!!! Here is your token',
            token : jsonToken.sign(user.toJSON() , 'codeial' , {expiresIn : '600000'})
        });
    }catch(err){
        if(err){
            console.log(err);
        }
        return res.json(500, {
            message : 'internal server error'
        });
    }
    
};