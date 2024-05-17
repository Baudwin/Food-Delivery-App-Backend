const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const dotenv = require('dotenv').config()
const User = require("../models/UserModel")

const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.secret
}


passport.use( new JwtStrategy(options, async(jwt_payload, done)=>{
   
    try {
      const user = await User.findOne({_id:jwt_payload._id}).select('_id')
     if (user) {
        return done(null, user)
     }
     else{
        return done(null, false)
     }
    } catch (error) {
     
       return done(error, false)
    }
}))