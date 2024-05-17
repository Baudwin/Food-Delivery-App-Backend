// const cloudinary = require('cloudinary').v2;
// require('dotenv').config()


// cloudinary.config({ 
//     cloud_name: process.env.CLOUD_NAME, 
//     api_key:  process.env.API_KEY, 
//     api_secret: process.env.API_SECRET
//   });

//    const cloudinaryUpload = async(file)=>{
//      try {
//     const uploadedResponse = await cloudinary.uploader.upload(file, {
//         upload_preset: 'product_preset' 
//     });
//     return uploadedResponse
// } catch (error) {
//     console.error('Upload Error:', error);
  
// } 
//   }

// module.exports = cloudinaryUpload