const router = require('express').Router()
const {login, authUser,register}  = require('../controllers/UserController')
// const {validateToken, validateUser} = require('../middleware/JWT')


router.post("/user-login", login)
router.get("/auth-user", authUser)
router.post("/register", register)


module.exports = router