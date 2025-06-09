const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Route gửi email xác nhận đơn hàng
router.post('/send-email', async (req, res) => {
  try {
    const { email, cartItems, total } = req.body;
    console.log(req.body)

    // Validate input
    if (!email || !cartItems || !total) {
      return res.status(400).json({ 
        success: false,
        message: 'Thiếu thông tin bắt buộc: email, cartItems hoặc total' 
      });
    }

    // Tạo transporter (nên dùng biến môi trường)
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER || 'buithithundh2003@gmail.com',
        pass: process.env.EMAIL_PASS || 'ifek hfhw uhnd pwqb'
      }
    });

    // Tạo nội dung HTML cho email
    const itemsHtml = cartItems.map(item => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.product?.title || 'Sản phẩm không xác định'}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quanity || 1}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${(item.price || 0).toLocaleString('vi-VN')}đ</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${((item.price || 0) * (item.quanity)).toLocaleString('vi-VN')}đ</td>
      </tr>
    `).join('');

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4a6baf;">Xác nhận đơn hàng</h2>
        <p>Cảm ơn bạn đã đặt hàng tại cửa hàng chúng tôi!</p>
        
        <h3 style="color: #4a6baf; margin-top: 20px;">Chi tiết đơn hàng</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Sản phẩm</th>
              <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">Số lượng</th>
              <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Đơn giá</th>
              <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="padding: 10px; border: 1px solid #ddd; text-align: right; font-weight: bold;">Tổng cộng:</td>
              <td style="padding: 10px; border: 1px solid #ddd; text-align: right; font-weight: bold;">${total.toLocaleString('vi-VN')}đ</td>
            </tr>
          </tfoot>
        </table>

        <p style="margin-top: 20px;">Đơn hàng của bạn đang được xử lý. Chúng tôi sẽ thông báo khi đơn hàng được giao.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p>Trân trọng,</p>
          <p><strong>Đội ngũ cửa hàng</strong></p>
        </div>
      </div>
    `;

    // Cấu hình email
    const mailOptions = {
      from: `"Cửa hàng" <${process.env.EMAIL_USER || 'buithithundh2003@gmail.com'}>`,
      to: email,
      subject: 'Xác nhận đơn hàng #' + Math.floor(Math.random() * 10000),
      html: htmlContent
    };

    // Gửi email
    const info = await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true,
      message: 'Email xác nhận đã được gửi thành công!' 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Đã xảy ra lỗi khi gửi email',
      error: error.message 
    });
  }
});

module.exports = router;