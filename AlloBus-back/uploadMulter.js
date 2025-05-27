const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path =require('path')


cloudinary.config({
    cloud_name:'amodev',
    api_key:'544974128899919',
    api_secret:'xnoTZPqXIB5TxsyCqQbQkywaB1Y',
  });

function uploadMulter(folderName) {
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: (req, file) => {
        const folderPath = `${folderName.trim()}`; // Update the folder path here
        const fileExtension = path.extname(file.originalname).substring(1);
        const publicId = `${file.fieldname}-${Date.now()}`;
        
        return {
          folder: folderPath,
          public_id: publicId,
          format: fileExtension,
        };
      },
    });
  
    return multer({
      storage: storage,
      limits: {
        fileSize: 1 * 1024 * 1024, // keep images size < 5 MB
      },
    });
  }
  
  module.exports = uploadMulter;