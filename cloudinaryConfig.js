const cloudinary = require('cloudinary').v2;
require('dotenv').config()


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key:  process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  });

  const cloudinaryUploadd = async(file)=>{
     try {
    const uploadedResponse = await cloudinary.uploader.upload(file, {
        upload_preset: 'product_preset' 
    });
    return uploadedResponse
} catch (error) {
    console.error('Upload Error:', error);
  
} 
  }


  module.exports = cloudinaryUploadd




//   const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const express = require('express');
// const multer = require('multer');

// const app = express();

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'some-folder-name',
//     format: async (req, file) => 'png', // supports promises as well
//     public_id: (req, file) => 'computed-filename-using-request',
//   },
// });

// const parser = multer({ storage: storage });

// app.post('/upload', parser.single('image'), function (req, res) {
//   res.json(req.file);
// });