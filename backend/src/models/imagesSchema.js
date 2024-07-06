const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    productId:{type:String,required:true},
    img1:{type:String,required:true},
    img2:{type:String,required:true},
    img3:{type:String,required:true}
})

const Image = mongoose.model('Image',imageSchema);
module.exports =Image;