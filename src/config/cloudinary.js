// 
// config/cloudinary.js
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Kiểm tra biến môi trường
if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_KEY || !process.env.CLOUDINARY_SECRET) {
  throw new Error('Thiếu cấu hình Cloudinary trong .env');
}

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true
});

console.log('Đã cấu hình Cloudinary cho:', cloudinary.config().cloud_name);

module.exports = cloudinary; // Xuất bằng CommonJS