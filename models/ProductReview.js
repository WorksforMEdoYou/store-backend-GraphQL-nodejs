const mongoose = require('mongoose');

const productReviewSchema = new mongoose.Schema({
  username: String,
  isAuthenticated: Boolean,
  product_name: String,
  review: String,
  comment: String,
});

module.exports = mongoose.model('ProductReview', productReviewSchema);
