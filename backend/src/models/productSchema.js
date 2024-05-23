const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type:String,
        required: true,
        contentType: String
    },
    price: {
        type: String,
        required: true,
        trim:true
    },
    description: {
        type: String,
        required: true
    },
    rating:{
        type: String,
        required: true,
        trim:true

    }
});
const Products = mongoose.model("Products", productSchema)

module.exports = Products