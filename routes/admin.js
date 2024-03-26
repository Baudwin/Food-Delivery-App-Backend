const router = require('express').Router()
const controller  = require('../controllers/AdminController')
const {validateToken,  validateAdmin} = require('../middleware/JWT')
const upload = require('../middleware/multer')

router.post("/admin-login", controller.login)
router.get("/auth-admin", validateToken,validateAdmin, controller.authAdmin)

router.post("/create-category", controller.addCategory)
router.get("/get-categories",  controller.getCategories)

router.post("/add-item",upload.single("img"), controller.addItems)
router.get("/get-items", controller.getItems)
router.get("/get-item/:id", controller.getItem)
router.delete("/delete-item/:it_id", validateToken,validateAdmin, controller.deleteItem)




module.exports = router