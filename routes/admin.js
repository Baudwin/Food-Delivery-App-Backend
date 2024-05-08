const router = require('express').Router()
const {authAdmin, addCategory, getCategories, addItems,getItem,deleteItem, getItems, login, getOrders, testCloudinary}  = require('../controllers/AdminController')
const {validateToken,  validateAdmin} = require('../middleware/JWT')
const upload = require('../middleware/multer')

router.post("/admin-login", login)
router.get("/auth-admin",authAdmin)

router.post("/create-category", addCategory)
router.get("/get-categories", getCategories)

router.post("/add-item",upload.single("img"), addItems)
router.get("/get-items", getItems)
router.get("/get-item/:id", getItem)
router.delete("/delete-item/:id", deleteItem)
router.get('/get-orders', getOrders)

router.post("/test-cloud",upload.single("item"), testCloudinary)


module.exports = router