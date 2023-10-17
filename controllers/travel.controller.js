const createHttpError = require('http-errors');
const Travel = require('../models/travel.model');
const { StatusCodes } = require('http-status-codes');


module.exports.getTravels = (req, res, next) => {
    Travel.find()
        .populate('user')
        .then((travels) => {
            res.json(travels)
        })
        .catch(next)
}

module.exports.getTravelsDetails = (req, res, next) => {
    const { id } = req.params;

    Travel.findById(id)
        .populate('user')
        .then((travel) => {
            res.json(travel)
        })
        .catch(next)
}

module.exports.addTrip = (req, res, next) => {

    const body = {
        ...req.body, 
        user: req.currentUser
    }

    Travel.create(body)
        .then(travel => res.status(StatusCodes.CREATED).json(travel))
        .catch(next)
}