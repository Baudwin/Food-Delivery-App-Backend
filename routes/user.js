const router = require('express').Router()
const {login, signup, placeOrder, addAddress, getAddress, getUserOrders}  = require('../controllers/UserController')
const {validateToken, validateUser} = require('../middleware/JWT')


router.post("/user-login", login)
router.post("/signup", signup)
router.post('/add-address',validateToken, addAddress)
router.get('/get-address',validateToken,  getAddress)
router.post('/place-order',validateToken,  placeOrder)
router.get('/my-orders',validateToken,  getUserOrders)


module.exports = router