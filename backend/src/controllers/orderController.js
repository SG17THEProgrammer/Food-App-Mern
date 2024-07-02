const order = require("../models/orderSchema")

const verifyOrder = async(req,res)=>{
        const {orderId,success} = req.body
        try {
            if(success=="true"){
                await order.findByIdAndUpdate(orderId,{payment:true})
                res.json({success:true,message:"paid"})
            }
            else{
                await order.findByIdAndDelete({_id:orderId})
                res.json({success:false,message:"not paid"})
  
            }
        } catch (error) {
                //console.log(error)
                res.json({success:false,message:"error"})
        }
}

const getOrder =async(req,res)=>{
    const {userId} = req.body
    try {
        const response = await order.find({userId})
        res.json({success:true,data:response})

    } catch (error) {
        //console.log(error)
        res.json({success:false,message:"error"})
        
    }
}

const showOrder =async(req,res)=>{
    const {orderId} = req.body
    // console.log(orderId)    
    try {
        const response = await order.find({_id:orderId})
        // console.log(response)
        res.json({success:true,data:response})
        //console.log(response)
    } catch (error) {
        //console.log(error)
        res.json({success:false,message:"error"})
    }
}




module.exports ={verifyOrder,getOrder,showOrder}