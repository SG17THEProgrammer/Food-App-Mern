const Contact = require('../models/contactSchema');
const Team = require('../models/teamSchema');
const reservation = require('../models/reservationSchema');




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
        // //console.log('hi')
        const user = await Team.find()
        // //console.log("user data" + user);
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

const reserveTable = async (req, res)=>{
    try {
        const reserve = req.body
        const {entryIn,entryOut} = req.body

        const entryInDate = new Date(entryIn);
  const entryOutDate = new Date(entryOut);

  //console.log(entryIn,entryOut) //2024-06-30T14:51 2024-06-30T15:55
  //console.log(entryInDate,entryOutDate) //2024-06-30T09:21:00.000Z 2024-06-30T10:25:00.000Z
  
  const openingTime = new Date(entryInDate);
  openingTime.setHours(8, 0, 0, 0); // 8:00 AM
  const closingTime = new Date(entryInDate);
  closingTime.setHours(23, 59, 59, 999); // 11:59 PM

  if (entryInDate >= entryOutDate) {
      return { valid: false, message: "entry-in must be before entry-out." };
  }
  
  
  const diffInHours = (entryOutDate - entryInDate) / (1000 * 60 * 60);
  if (diffInHours > 24) {
      return res.status(404).json({message: ["Reservation cannot exceed 24 hours." ]})
    }
    
    if (entryInDate < openingTime || entryOutDate > closingTime) {
      return res.status(404).json({message:[ "Reservation must be between 8:00 AM and 12:00 PM."]  })
    }

      await reservation.create(reserve)
            return res.status(200).json({ message:[ "Reservation compeleted successfully"] });
   

    } catch (error) {
            //console.log(error)
            return res.status(500).json({ message:[ "Error occurred while doing reservation"] });

    }
}





module.exports = {  contact, team ,reserveTable}