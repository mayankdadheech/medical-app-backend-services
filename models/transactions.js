const mongoose = require('mongoose');

const TransactionsSchema = new mongoose.Schema({
  medicinesDetails: {
    type: Object,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  timestamp: { type: Date, default: Date.now},
  // userId: {
  //   type: Number,
  //   required: true,
  // }
});




module.exports = mongoose.model('Transactions', TransactionsSchema);