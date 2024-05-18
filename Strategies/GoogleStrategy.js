const passport = require('passport')
require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/UserModel');


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === 'production' 
    ? 'https://food-delivery-app-backend-xi.vercel.app/auth/google/callback' 
    : 'http://localhost:3005/auth/google/callback',
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
