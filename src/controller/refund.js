const ReturnRequest = require('../models/refund');

// Tạo yêu cầu đổi/trả
exports.createReturnRequest = async (req, res) => {
  try {
    const { orderItemId, productId, requestType, reason, description } = req.body;
    
    const newRequest = new ReturnRequest({
      orderItemId,
      productId,
      userId: req.user._id,
      requestType,
      reason,
      description,
      status: 'pending'
    });

    await newRequest.save();

    res.status(201).json({
      success: true,
      message: 'Yêu cầu đổi/trả đã được gửi thành công',
      data: newRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo yêu cầu đổi/trả',
      error: error.message
    });
  }
};

// Lấy danh sách yêu cầu của user
exports.getUserReturnRequests = async (req, res) => {
  try {
    const requests = await ReturnRequest.find({ userId: req.user._id })
      .populate('productId', 'name price')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách yêu cầu',
      error: error.message
    });
  }
};

// Lấy chi tiết yêu cầu
exports.getReturnRequestById = async (req, res) => {
  try {
    const request = await ReturnRequest.findById(req.params.id)
      .populate('productId', 'name price');

    if (!request) {
      return res.status(404).json({ 
        success: false,
        message: 'Không tìm thấy yêu cầu' 
      });
    }

    res.status(200).json({
      success: true,
      data: request
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin yêu cầu',
      error: error.message
    });
  }
};

// Lấy tất cả yêu cầu (không phân quyền admin)
exports.getAllReturnRequests = async (req, res) => {
  try {
    const requests = await ReturnRequest.find()
      .populate('productId', 'name price')
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách yêu cầu',
      error: error.message
    });
  }
};

// Cập nhật trạng thái yêu cầu
exports.updateReturnStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const updatedRequest = await ReturnRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy yêu cầu'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật trạng thái thành công',
      data: updatedRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật trạng thái',
      error: error.message
    });
  }
};