const mongoose = require('mongoose');

const dealerSchema = new mongoose.Schema({
  company_name: String,
  dealer_name: String,
  date_of_buyed: Date,
  qty: Number,
  unit_price: Number,
});

module.exports = mongoose.model('Dealer', dealerSchema);
