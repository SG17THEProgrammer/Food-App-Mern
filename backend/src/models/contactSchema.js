const { Schema, model } = require("mongoose");
const contactSchema = new Schema({
    name: { type: String, required: true }, 
    email: { type: String, required: true },
    message: { type: String, required: true , unique: [true,["Do not send same message"]] },
});
// create a new collections(Model) 
const Contact = new model("Contact", contactSchema);
 module.exports = Contact;  