const { Schema, model } = require("mongoose");
const deliverySchema = new Schema({
    userId: { type: String, required: true},
    name: { type: String, required: true }, 
    email: { type: String, required: true },
    address: { type: String, required: true},
    city:{ type: String, required: true},
    state:{ type: String, required: true},
    pincode:{ type: Number, required: true},
    phone:{ type: Number, required: true},
    message: { type: String, unique: [true,["Do not send same message"]] },
});
// create a new collections(Model) 
const Delivery = new model("Delivery", deliverySchema);
module.exports = Delivery;  