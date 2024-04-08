const router = require('express').Router()
const {login, signup, placeOrder, addAddress}  = require('../controllers/UserController')
const {validateToken, validateUser} = require('../middleware/JWT')


router.post("/user-login", login)
router.post("/signup", signup)
router.post('/add-address',validateToken, validateUser, addAddress)
router.post('/place-order',validateToken, validateUser, placeOrder)


module.exports = router