const User = require('../model/user');

// renders profile page
module.exports.profile = function (req, res) {
    return res.render('profile');
}

// renders sign in page
module.exports.signIn = function (req, res) {
    return res.render('signIn');
}

// renders sign up page
module.exports.signUp = function (req, res) {
    return res.render('signUp');
}

// Handle  user account creation
module.exports.create_account = function (req, res) {
    
    if (req.body.password != req.body.confirm_password) {
        console.log('Password not Match!!! Enter same password in password and confirm password fields');
        return res.redirect('back');
    }

    const check = User.findOne({ email: req.body.email }).exec();
    check.then((data) => {
        if (data) {
            console.log('User already exist');
            return res.redirect('back');
        } else {
            const newUser = User.create(req.body);
            newUser.then((userCreated) => {
                console.log('User account created successfully. You can login now!!!');
                return res.render('signIn');
            }).catch((error) => {
                console.log('error in user creation in db');
                return;
            });
        }
    }).catch((err) => {
        console.log('error in fetching user from db while checking existing user');
        return;
    });
}

// Handle  user authentication
module.exports.create_session = function (req, res) {
    // TODO later
}
