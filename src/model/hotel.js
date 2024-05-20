const mongoose = require('mongoose');


const hotelSchema = new mongoose.Schema({
  hotelId:{
    type:String,
    required:true
  },
  hotelName: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  price: {
    type: String,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
});

// Adding the auto-increment plugin to the schema
const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
