const createHttpError = require('http-errors');
const Travel = require('../models/travel.model');
const { StatusCodes } = require('http-status-codes');

module.exports.getFilteredTravels = (req, res, next) => {
     const {id} = req.params;
    const today = new Date();  // Current date
    const endDate = new Date('2023-12-31');  // Replace with your desired end date
    
    Travel.find({
      date: {
        $gte: today,
        $lte: endDate
      }
    })
    .then((travels) => {
        res.json(travels)
    })
    .catch(next)
}
       
