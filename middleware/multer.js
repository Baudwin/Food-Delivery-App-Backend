const multer = require('multer')
try {

const upload = multer()

module.exports = upload

    
} catch (err) {
    console.log(err);
}
