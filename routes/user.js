const router = require('express').Router()
const controller  = require('../controllers/UserController')
const {validateToken, validateUser} = require('../middleware/JWT')


router.post("/user-login", controller.login)
router.get("/auth-user", validateToken,validateUser, controller.authUser)
router.post("/register", controller.register)


module.exports = router