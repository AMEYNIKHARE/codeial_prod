const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../model/user');
const env = require('./environment');

passport.use(new GoogleStrategy({
        clientID: env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL: env.google_call_back_url,
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