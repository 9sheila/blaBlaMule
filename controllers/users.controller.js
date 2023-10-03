const createHttpError = require('http-errors');
const User = require('../models/User.model');
const { StatusCodes } = require('http-status-codes');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUser)
    .then(user => {
      if (!user) {
        next(createHttpError(StatusCodes.NOT_FOUND, 'User not found'))
      } else {
        res.json(user)
      }
    })
    .catch(next)
}
module.exports.getUsers = (req, res, next) => {
  User.find()
      .populate('Travel')
      .then((users) => {
          res.json(users)
      })
      .catch(next)
}
module.exports.editUser = (req, res, next) => {
  User.findByIdAndUpdate(req.currentUser, req.body, { new:true })
  .then((currentUser) => {
      if(!currentUser) {
          console.log('no encuentro al usuario')
      }
      res.json(currentUser)
  })
  .catch(err => {
      console.log('error')
      next(err)
  })
}