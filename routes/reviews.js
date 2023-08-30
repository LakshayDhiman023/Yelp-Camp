const express = require('express');
const router = express.Router({mergeParams: true});
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
// const campgrounds = require('./routes/campground')
// const reviews = require('./routes/reviews')
const { reviewSchema } = require('../schemas.js')
const Campground = require('../models/campground.js');
const Review = require('../models/review');

const validateReview = (req, res, next)=>{
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }else{
        next();
    }
}

router.post('/', validateReview, catchAsync(async(req, res)=>{
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    // res.send("hello");
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully added your review')
    res.redirect(`/campgrounds/${campground._id}`);

}))

router.delete('/:reviewId', catchAsync( async(req, res)=>{
    const { id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: {reviews: reviewId} });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/campgrounds/${id}`);
    // res.send("hello");
}))

module.exports = router