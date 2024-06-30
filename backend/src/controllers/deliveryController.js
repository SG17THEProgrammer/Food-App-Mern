const delivery_add = require('../models/deliverySchema');
const order = require("../models/orderSchema")


const delivery=async(req,res)=>{
    try {
        console.log(req.body)
        
        const {delDetails,userId} = req.body
        const {name,email,phone,address,city,pincode,state}  = delDetails
        const delData = {
            name,email,phone,address,city,pincode,state,userId
          };
          if(!delDetails.address){
               return res.status(400).json({ message: ["Can't proceed without address"] });
      
          }
          if(!delDetails.state){
               return res.status(400).json({ message: ["Can't proceed without state"] });
      
          }
          if(!delDetails.city){
               return res.status(400).json({ message: ["Can't proceed without city"] });
      
          }
          if(!delDetails.pincode){
               return res.status(400).json({ message: ["Can't proceed without pincode"] });
      
          }
        const details = new delivery_add(delData);
        await details.save();
        return res.status(200).json({ message:[ "delivery details saved successfully "] });

        

    } catch (error) {
        return res.status(500).json({ message:[ "Error occurred while placing order"] });

    }
}


const updateDeliveryStatus =async(req,res)=>{
    const {orderId ,status}= req.body;
    try {
        await order.findByIdAndUpdate(orderId , {status:status})
        res.json({success:true,message:["Status Changed"]})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
        
    }
}

const getDeliveryAddress = async(req,res)=>{
    const {userId} = req.body;
    try {   
        const response = await delivery_add.find({userId:userId})
        return res.status(200).json({success:true,message:["Delivery Address found"],data:response})
    } catch (error) {
        console.log(error)
        return res.status(404).json({success:false,message:["Delivery Address not found"]})
    }
}

module.exports = {delivery ,updateDeliveryStatus,getDeliveryAddress}