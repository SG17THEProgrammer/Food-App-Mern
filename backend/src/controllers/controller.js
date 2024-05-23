const Contact = require('../models/contactSchema');
const Team = require('../models/teamSchema');





const contact = async (req, res) => {
    try {
        const user = req.body;
        await Contact.create(user);
        return res.status(200).json({ message:[ "message send successfully"] });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(200).json({ message: ["Do not send the same message"] });
        }
        return res.status(500).json({ message:[ "Error occurred while sending message"] });
    }
}

const team = async (req, res) => {
    try {
        // console.log('hi')
        const user = await Team.find()
        // console.log("user data" + user);
        if (!user) {
            res.status(404).send('No Info found')
            return;
        }
        else {
            return res.status(200).json({ user });
        }
    } catch (error) {
        res.status(400).send(error)
    }
}





module.exports = {  contact, team }