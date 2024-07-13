const mongoose = require('mongoose');

const recommendedFoodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type:String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        
    },
    description: {
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true,

    }
});
const recommendedProducts = mongoose.model("recommendedProducts", recommendedFoodSchema)

module.exports = recommendedProducts