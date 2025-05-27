const mongoose = require('mongoose');

const CompanyImageSchema = new mongoose.Schema({
  imageUrl: String,
  name: String,
  price: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('CompanyImage', CompanyImageSchema);
  