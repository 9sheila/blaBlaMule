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

module.exports.editTravel = (req, res, next) => {
    const { id } = req.params;
    const { date, startingPoint, destination, weight, price } = req.body;
  
    if (!date || !startingPoint || !destination || !weight || !price) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }
  
    Travel.findByIdAndUpdate(id, { date, startingPoint, destination, weight, price }, { new: true })
      .then(updatedTravel => {
        if (!updatedTravel) {
          return res.status(404).json({ message: 'Viaje no encontrado' });
        }
        res.json(updatedTravel);
      })
      .catch(err => {
        console.error('Error al editar el viaje:', err.message);
        next(err);
      });
  };