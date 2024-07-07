const { Schema, model } = require("mongoose");

const delManSchema = new Schema({
    name:{type:String, required:true},
    phone:{type:String, required:true},
})

const delivery_man = new model('delivery_man' , delManSchema)
module.exports =delivery_man