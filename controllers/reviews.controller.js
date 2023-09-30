const Reviews = require('../models/reviews.model');
const createError = require('http-errors');


module.exports.createReviews = (req, res, next) => {
    const data = {
        ...req.body,
        currentUser: req.currentUser,
        user: req.params.id,
        date: new Date()
    }

    Reviews.create(data)
        .then((reviews) => {
            res.json(reviews)
        })
        .catch(next)
}


module.exports.deleteReviews = (req, res, next) => {
    const { id } = req.params;
    Reviews.findByIdAndDelete(id)
        .then((reviews) => {
            res.json({ message: 'Review has been deleted'})
        })
        .catch((err) => {
            console.log(err)
        })
}