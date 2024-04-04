const router = require('express').Router()
const {login, signup, placeOrder}  = require('../controllers/UserController')
const {validateToken, validateUser} = require('../middleware/JWT')


router.post("/user-login", login)
router.post("/signup", signup)
router.post('/place-order', placeOrder)


module.exports = router