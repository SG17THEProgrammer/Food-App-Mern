const order = require("../models/orderSchema")

const verifyOrder = async(req,res)=>{
        const {orderId,success} = req.body
        try {
            if(success=="true"){
                await order.findByIdAndUpdate(orderId,{payment:true})
                res.json({success:true,message:"paid"})
            }
            else{
                await order.findByIdAndDelete(orderId)
                res.json({success:false,message:"not paid"})
  
            }
        } catch (error) {
                console.log(error)
                res.json({success:false,message:"error"})
        }
}

const getOrder =async(req,res)=>{
    const {userId} = req.body
    try {
        const response = await order.find({userId})
        res.json({success:true,data:response})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
        
    }
}

module.exports ={verifyOrder,getOrder}