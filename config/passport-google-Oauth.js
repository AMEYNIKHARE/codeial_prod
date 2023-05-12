const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../model/user');

passport.use(new GoogleStrategy({
        clientID: '976475207922-8ofaj4n92lr3dsa8o0hj2qekfgtf5e4p.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:8000/user/auth/google/callback",
        passReqToCallback   : true
    },

    async function(req, accessToken, refreshToken, profile, done) {
            
        try{
            const user = await User.findOne({email : profile.emails[0].value});
            if(user){
                return done(null, user);
            }
            else{
                const created_user = await User.create({
                    email : profile.emails[0].value,
                    name : profile.displayName,
                    password : crypto.randomBytes(20).toString('hex')
                });
                return done(null, created_user);
            }
        }
        catch(err){
            if(err){
                console.log('error in passport google startegy ' , err)
                return;
            }
        }
    }

));

module.exports = passport;