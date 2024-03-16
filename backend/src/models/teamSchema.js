const { Schema, model } = require("mongoose");

const teamSchema = new Schema({
    name: { type: String, required: true }, 
    designation: { type: String, required: true },
    about: { type: String, required: true },
    email: { type: String, required: true},
    image: { type: String, required: true,contentType: String
    }
});
// create a new collections(Model) 
const Team = new model("Team", teamSchema);
 module.exports = Team;  