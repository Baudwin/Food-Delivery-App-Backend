const passport = require('passport')
require('../Strategies/GoogleStrategy')
const router = require('express').Router()
const {login, signup, placeOrder, addAddress, getAddress, getUserOrders, authFailure, authSuccess}  = require('../controllers/UserController')
// const {validateToken, validateUser} = require('../middleware/JWT')
require('../Strategies/JwtStragegy')
const authenticateJWT = require('../middleware/authenticateJwt')


router.post("/user-login", login)
router.post("/signup", signup)
router.get('/auth/failed', authFailure)

router.get('/auth/google', passport.authenticate('google', { scope: ['email','profile'] })  );

router.get('/auth/google/callback', passport.authenticate('google',{session:false}), (req,res)=>{
    res.send(req.user)
    // res.redirect("http://localhost:3004/")
})


// successRedirect : 'http://localhost:3004/', 
// failureRedirect: "/auth/failed"
router.post('/add-address',authenticateJWT, addAddress)
router.get('/get-address',authenticateJWT,  getAddress)
router.post('/place-order',authenticateJWT,  placeOrder)
router.get('/my-orders',authenticateJWT,  getUserOrders)


module.exports = router