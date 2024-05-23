const { Schema, model } = require("mongoose");
const reviewSchema = new Schema({
    rating: { type:Number, required: true }, 
    comment: { type: String, required: true},
    userId: { type: String},
    productId: { type: String},
});
const Review = new model("Review", reviewSchema);
 module.exports = Review;  