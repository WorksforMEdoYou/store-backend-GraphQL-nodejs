const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_image: String,
  product_name: String,
  product_price: Number,
  product_description: String,
  product_discount: Number,
  product_review: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'ProductReview' 
}],
});

module.exports = mongoose.model('Product', productSchema);
