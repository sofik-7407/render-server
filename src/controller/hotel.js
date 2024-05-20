const mongoose = require("mongoose");
const hotelModel = require('../model/hotel');
const userHotelMappingModle = require("../model/userHotelMapping");
const responseLib = require("../libs/responseLib");
const checkLib = require("../libs/checkLib");
const common = require("../controller/common")

// add new hotel
const addHotel = async (req, res) => {
  try {
    const {hotelName,rating,price}=req.body;
    const hotelId = await common.generateRandomId();
    const newHotel = new hotelModel({
        hotelId,
        hotelName,
        rating,
        price
    })
    await newHotel.save();
    const apiResponse = responseLib.generate(true,"Hotel added successfully",{});
    res.status(200).send(apiResponse);
  } catch (err) {
    const apiResponse = responseLib.generate(false, err.message, {});
    res.status(500).send(apiResponse);
  }
};

//Book hotel by it's id
const bookHotel = async (req, res) => {
    try {
      const {userId,hotelId,checkIn,checkOut,guests} = req.body;
      console.log("req body====>",req.body);
      const hotel = await hotelModel.findOne({ hotelId,isAvailable: true });
      console.log("hotel ===>",hotel);
      let message;
      let data;
      let bookingId = "";
      if (!checksLib.isEmpty(hotel)) {
        hotel.isAvailable = false;
        await hotel.save();
        bookingId = common.generateRandomId();
        const userHotelMapping = new userHotelMappingModle({
          bookingId,
          userId,
          hotelId,
          bookingDate:Date.now(),
          checkIn,
          checkOut,
          guests
        })
        await userHotelMapping.save();
        message = "Hotel Booked successfully";
        
      } else {
        message = "Hotel not available";
        data = {};
      }
      const apiResponse = {success:true,message,bookingId};
      res.status(200).send(apiResponse);
    } catch (err) {
      const apiResponse = responseLib.generate(false, err.message,{});
      res.status(500).send(apiResponse);
    }
  };
  
  

//get all the available hotels
const getAvailableHotels = async (req, res) => {
  try {
      const hotels = await hotelModel.find({ isAvailable: true }).select({ _id: 0, hotelId: 1, hotelName: 1, rating: 1, price: 1, isAvailable: 1 });
      console.log("hotel ===>", hotels);
      const message = hotels.length > 0 ? "Available hotels are following" : "No hotel available";
      const apiResponse = { success: true, message, hotels };
      res.status(200).send(apiResponse);
  } catch (error) {
      const apiResponse = responseLib.generate(false, error.message, {});
      res.status(500).send(apiResponse);
  }
}


module.exports = {
  addHotel:addHotel,
  bookHotel:bookHotel,
  getAvailableHotels:getAvailableHotels
};
