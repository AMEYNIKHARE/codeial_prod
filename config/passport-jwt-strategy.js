const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../model/user');

const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'
};

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // console.log('entered in passport');
    const user = User.findOne({id : jwt_payload.id}).exec();

    user.then((foundUser)=>{
        if (foundUser) {
            // console.log(foundUser);
            return done(null, foundUser);
        } 
        else {
            // console.log("Here is the error");
            return done(null, false);
        }
    }).catch((err)=>{
        if (err) {
            console.log(err);
            return done(err);
        }
    });
        
}));


module.exports = passport;