const { Schema, model } = require("mongoose");

const qaSchema = new Schema({
    ques: { type:Number, required: true }, 
    ans: { type: String, required: true},
});
const qa = new model("qa", qaSchema);
 module.exports = qa;  