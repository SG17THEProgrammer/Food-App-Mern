
const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    tables:{type:Number,required:true},
    members:{type:Number,required:true},
    entryIn:{type:Date,required:true},
    entryOut:{type:Date,required:true},

})

const reservation = new mongoose.model('reservation',reservationSchema)
module.exports = reservation