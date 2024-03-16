const mongoose = require('mongoose');

const mallitemsSchema = mongoose.Schema({
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
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating:{
        type: String,
        required: true
    }
});
const mallitems = mongoose.model("mallitems", mallitemsSchema)

module.exports = mallitems