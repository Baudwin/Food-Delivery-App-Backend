const passport = require('passport')
require('dotenv').config()
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
const User = require('../models/UserModel');


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    session:false,
     proxy: true,
  },
 async function(accessToken, refreshToken, profile, cb) {

    try {
        const user  = await User.findOne({ googleId: profile.id})
       if (!user) {
           const newUser = await User.create({
               googleId: profile.id, 
               username: profile.displayName,
               email : profile._json.email,
               img : profile._json.picture
           })
   
           return cb(null, newUser)
       }
       else{
 
           return cb(null, user)
       }  
       } catch (error) {
        console.log(error);
       }

  }
));
