const multer = require('multer')
const path = require('path')


try {
// const storage = multer.diskStorage({
//    destination:(req,file,cb)=>{
//       cb(null,'/uploads')
//    }, 
//    filename:(req,file,cb)=>{
//       cb(null,file.fieldname + '-'+ Date.now() + path.extname(file.originalname))
//    }
// })
const upload = multer()

module.exports = upload    

} catch (err) {
   throw err
}
