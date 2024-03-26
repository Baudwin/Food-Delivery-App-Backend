const multer = require('multer')
try {
const storage = multer.diskStorage({
    destination: 'public/',
    filename:(req,file,cb)=>{
        cb(null, Date.now() + "_" + file.originalname)
    }
})

const upload = multer({
    storage:storage
})

module.exports = upload

    
} catch (err) {
    console.log(err);
}
