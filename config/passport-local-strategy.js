const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');

// Authentication using passport
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback : true
    },

    function (req, email, password, done) {
        const user = User.findOne({ email: email }).exec();

        user.then((foundUser) => {
            if (!foundUser || foundUser.password != password) {
                req.flash('error' , 'Invalid Username or Password');
                return done(null, false);
            }

            return done(null, foundUser);

        }).catch((err) => {
            if (err) {
                req.flash('error' , err);
                return done(err);
            }
        })
    }
));

// serializing the user ti decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    // console.log(user.id);
    // console.log(user._id);
    return done(null, user.id);
});

// deserializing the user frm the key in the cookie
passport.deserializeUser(function (id, done) {
    const user = User.findById(id).exec();

    user.then((foundUser) => {
        return done(null, foundUser);
    }).catch((err) => {
        if (err) {
            console.log('error in fetching the user from database');
            return done(err);
        }
    });
});


passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/user/sign-in');
};

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }

    return next();
};

passport.checkAlreadyLogin = function(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('back');
    }

    return next();
};

module.exports = passport;