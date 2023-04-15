const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');

// Authentication using passport
passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },

    function (email, password, done) {
        const user = User.findOne({ email: email }).exec();

        user.then((foundUser) => {
            if (!foundUser || foundUser.password != password) {
                console.log('Invalid user/password');
                return done(null, false);
            }

            return done(null, foundUser);

        }).catch((err) => {
            if (err) {
                console.log('error in fetching the user from database');
                return done(err);
            }
        })
    }
));

// serializing the user ti decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    // console.log(user.id);
    // console.log(user._id);
    done(null, user.id);
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

module.exports = passport;