const mongoose = require('mongoose');

const returnRequestSchema = new mongoose.Schema({
  orderItemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  requestType: {
    type: String,
    enum: ['return', 'exchange', 'refund'],
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ReturnRequest', returnRequestSchema);