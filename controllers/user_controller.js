const User = require('../model/user');

// renders profile page

module.exports.Myprofile = function (req, res) {

    const user = User.findById(req.user.id).exec();

    user.then((data) => {
        return res.render('profile', { singleUser: data });
    }).catch((err) => {
        req.flash('error' , err);
        console.log('error in fecthing user details from db ', err);
        return res.redirect('back');
    });
}


module.exports.profile = function (req, res) {

    const user = User.findById(req.params.id).exec();

    user.then((data) => {
        return res.render('profile', { singleUser: data });
    }).catch((err) => {
        req.flash('error' , err);
        console.log('error in fecthing user details from db ', err);
        return res.redirect('back');
    });
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
module.exports.update = function (req, res) {
    if (req.params.id == req.user.id) {
        User.findByIdAndUpdate(req.params.id, req.body).exec();
        req.flash('success' , 'User details updated successfully');
        return res.redirect('back');
    }
    else {
        const user = User.findById(req.params.id).exec();

        user.then((data) => {
            req.flash('error' , 'You are not Authorized to update details');
            return res.status(401).send(`You are not Authorized to change details of ${data.name}`);
        }).catch((err) => {
            req.flash('error' , err);
            console.log('error in fecthing user details from db ', err);
            return res.redirect('back');
        });
        
    }
};