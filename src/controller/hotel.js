const mongoose = require("mongoose");
const axios = require('axios');
const hotelModel = require('../model/hotel');
const permissionModel = require('../model/permission');
const userHotelMappingModle = require("../model/userHotelMapping");
const responseLib = require("../libs/responseLib");
const checkLib = require("../libs/checkLib");

// add new hotel
const addHotel = async (req, res) => {
  try {
    const {hotelName,hotelId,rating,price}=req.body;
    //const hotelId = await common.generateRandomId();
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
      const {userId,bookingId,hotelId,checkIn,checkOut,guests} = req.body;
      const hotel = await hotelModel.find({ hotelId,isAvailable: true });
      let message;
      if (hotel) {
        hotel.isAvailable = false;
        await hotel.save();
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
    let permission = await permissionModel.findOne({});
    if (permission.permission === false) {
      const apiResponse = responseLib.generate(false, "Permission denied by Render server", {});
      return res.status(200).send(apiResponse);
    }

    const response = await axios.get('http://52.66.149.80:5001/get-hotel');  //available hotel list getting from cloud server,here we connect local to cloude server
    const hotels = response.data.hotelList; 
    const message = hotels.length > 0 ? "Available hotels are following" : "No hotel available";
    const apiResponse = { success: true, message, hotels };
    res.status(200).send(apiResponse);
  } catch (error) {
    const apiResponse = responseLib.generate(false, error.message, {}); // Assuming responseLib is defined elsewhere
    res.status(500).send(apiResponse);
  }
}



module.exports = {
  addHotel:addHotel,
  bookHotel:bookHotel,
  getAvailableHotels:getAvailableHotels
};
