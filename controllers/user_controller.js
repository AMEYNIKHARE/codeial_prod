const User = require('../model/user');
const Frinendship = require('../model/friendship');
const fs = require('fs');
const path = require('path');

// renders profile page

module.exports.Myprofile = async function (req, res) {
    try{
        const user = await User.findById(req.user.id);
        if(user) {
            return res.render('profile', { singleUser: user });
        }
    }catch(err){
        req.flash('error' , err);
        console.log('error in fecthing user details from db ', err);
        return res.redirect('back');
    };
}


module.exports.profile = async function (req, res) {
    try{
        const user = await User.findById(req.params.id);
        const existingfriendship1 = await Frinendship.findOne({from_user : req.params.id , to_user : req.user.id})
        const existingfriendship2 = await Frinendship.findOne({from_user : req.user.id , to_user : req.params.id})
        let existingfriendship = false;
        if(existingfriendship1 || existingfriendship2){
            existingfriendship = true;
        }
        if(user){
            return res.render('profile', { singleUser: user , isFriend : existingfriendship });
        }
    }
    catch(err){
            req.flash('error' , err);
            console.log('error in fecthing user details from db ', err);
            return res.redirect('back');
    };
}

// renders sign in page
module.exports.signIn = function (req, res) {
    return res.render('signIn');
}

// renders sign up page
module.exports.signUp = function (req, res) {
    return res.render('signUp');
}

// To sign out user (remove session cookie basically from browser)
module.exports.signOut = function (req, res) {
    // res.clearCookie('codeial');
    req.logout((err) => {
        if (err) {
            req.flash('error' , err);
            console.log('error in logout ', err);
            return;
        }
        req.flash('success' , 'Logged out successfully');
        return res.redirect('/');
    });
}

// Handle  user account creation
module.exports.create_account = function (req, res) {

    if (req.body.password != req.body.confirm_password) {
        req.flash('error' , 'Password Not Matching');
        return res.redirect('back');
    }

    const check = User.findOne({ email: req.body.email }).exec();
    check.then((data) => {
        if (data) {
            req.flash('error' , 'User already exist');
            console.log('User already exist');
            return res.redirect('back');
        } else {
            const newUser = User.create(req.body);
            newUser.then((userCreated) => {
                req.flash('success' , 'New user created successfully. You can login Now!!!');
                console.log('User account created successfully. You can login now!!!');
                return res.redirect('/user/sign-in');
            }).catch((error) => {
                req.flash('error' , error);
                console.log('error in user creation in db');
                return;
            });
        }
    }).catch((err) => {
        req.flash('error' , err);
        console.log('error in fetching user from db while checking existing user');
        return;
    });
}

// Handle  user authentication
module.exports.create_session = function (req, res) {
    req.flash('success' , 'Logged In Successfully');
    return res.redirect('/home');
}

// Update user details in database
module.exports.update = async function (req, res) {
    if (req.params.id == req.user.id) {
        try{
            let user = await User.findById(req.params.id);

            User.uploadAvatar(req, res, function(err){
                if(err){
                    console.log(err);
                };
    
                user.name = req.body.name;
                user.email = req.body.email;
    
                if(req.file){
                    if(user.avatar){
                        const fileExist = fs.existsSync(path.join(__dirname , '..' , user.avatar));
                        if(fileExist){
                            fs.unlinkSync(path.join(__dirname , '..' , user.avatar));
                        }
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                req.flash('success' , 'User details updated successfully');
                return res.redirect('back');
            });
        }
        catch(err){
            req.flash('error' , err);
            return res.redirect('back');
        }

    }
    else {
        try{
            let user = await User.findById(req.params.id);

            if (user){
                req.flash('error' , 'You are not Authorized to update details');
                return res.redirect('back');
                // return res.status(401).send(`You are not Authorized to change details of ${data.name}`);
            }
            else {
                req.flash('error' , err);
                console.log('error in fecthing user details from db ', err);
                return res.redirect('back');
            };
        }
        catch(err){
            req.flash('error' , err);
            return res.redirect('back');
        }
    }
};