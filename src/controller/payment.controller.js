const { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } = require('vnpay');
const {getAllOrders}= require("../services/order.services");

const createPayment = async(req, res)=>{
    // console.log(req.user)
    const user = await req.user;
    // console.log(user)
    try {
        const vnpay = new VNPay({
            tmnCode: 'ZFIKHLA5',
            secureSecret: 'EOHPAEGFD4ZV68CEPTP3K62BS1RZG801',
            vnpayHost: 'https://sandbox.vnpayment.vn',
            testMode: true, // chế độ test
            hashAlgorithm: 'SHA512',
            loggerFn: console.log, // hoặc ignoreLogger nếu muốn ẩn log
          });
    
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          const vnpayResponse = await vnpay.buildPaymentUrl({
            vnp_Amount: findCart.total,
            vnp_IpAddr: '127.0.0.1',
            vnp_TxnRef: findCart._id,
            vnp_OrderInfo: `${findCart._id}`,
            vnp_OrderType: 'Other',
            vnp_ReturnUrl: 'http://localhost:5001/api/check-payment-vnpay',
            vnp_Locale: 'vn',
            vnp_CreateDate: dateFormat(new Date(), 'yyyymmddHHMMss'),
            vnp_ExpireDate: dateFormat(tomorrow, 'yyyymmddHHMMss'),
          });
    
          return res.status(201).json(vnpayResponse);
        
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}
module.exports = {
    createPayment
   
}