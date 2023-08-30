const mongoose = require('mongoose');
// const { campgroundSchema } = require('../schemas');
const Review = require('./review');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    image: String,
    reviews:[{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]

});

CampgroundSchema.post('findOneAndDelete', async function(doc){
    console.log(doc);
    for(let review of doc.reviews){
        await Review.findOneAndRemove({
            _id: review
        })
    }
    // if(doc){
    //     await Review.remo({
    //         _id: {
    //             $in: doc.reviews
    //         }
    //     })
    // }
})


module.exports = mongoose.model('Campground', CampgroundSchema);