const multer = require('multer')

const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename:(req,file,cb)=>{
        cb(null, Date.now() + "_" + file.originalname)
    }
})

const upload = multer({
    storage:storage
}).single("img")

module.exports = upload