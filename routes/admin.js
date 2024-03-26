const router = require('express').Router()
const {authAdmin, addCategory, getCategories, addItems,getItem,deleteItem, getItems, login}  = require('../controllers/AdminController')
const {validateToken,  validateAdmin} = require('../middleware/JWT')
const upload = require('../middleware/multer')

router.post("/admin-login", login)
router.get("/auth-admin",authAdmin)

router.post("/create-category", addCategory)
router.get("/get-categories", getCategories)

router.post("/add-item",upload.single("img"), addItems)
router.get("/get-items", getItems)
router.get("/get-item/:id", getItem)
router.delete("/delete-item/:it_id", deleteItem)




module.exports = router