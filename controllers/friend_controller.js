const User = require('../model/user');
const Frinendship = require('../model/friendship');

module.exports.addFriend = async function(req, res){
    try{
        const currentUser = await User.findById(req.user.id);
        const friendUser = await User.findById(req.params.id);
        const existingfriendship1 = await Frinendship.findOne({from_user : req.params.id , to_user : req.user.id})
        const existingfriendship2 = await Frinendship.findOne({from_user : req.user.id , to_user : req.params.id})
        
        if(existingfriendship1 || existingfriendship2){
            return res.redirect('back');
        }

        const EstablishFriendship = await Frinendship.create({
            from_user : req.user.id,
            to_user : req.params.id
        });

        currentUser.friends.unshift(EstablishFriendship);
        currentUser.save();
        friendUser.friends.unshift(EstablishFriendship);
        friendUser.save();
        return res.redirect('back');
    }
    catch(err){
        req.flash('error' , 'error in adding friend');
        console.log('error ' , err)
        return res.redirect('back');
    }
    
}

module.exports.removeFriend = async function(req, res){
    try{
        const currentUser = await User.findById(req.user.id);
        const friendUser = await User.findById(req.params.id);
        const existingfriendship1 = await Frinendship.findOne({from_user : req.params.id , to_user : req.user.id})
        const existingfriendship2 = await Frinendship.findOne({from_user : req.user.id , to_user : req.params.id})
        
        if(existingfriendship1){
            currentUser.friends.pull(existingfriendship1._id);
            currentUser.save();
            friendUser.friends.pull(existingfriendship1._id);
            friendUser.save();
            await Frinendship.findByIdAndRemove(existingfriendship1._id);
            return res.redirect('back');
        }
        else if(existingfriendship2){
            currentUser.friends.pull(existingfriendship2._id);
            currentUser.save();
            friendUser.friends.pull(existingfriendship2._id);
            friendUser.save();
            await Frinendship.findByIdAndRemove(existingfriendship2._id);
            return res.redirect('back');
        }

        return res.redirect('back');
    }
    catch(err){
        req.flash('error' , 'error in adding friend');
        console.log('error ' , err)
        return res.redirect('back');
    }
}