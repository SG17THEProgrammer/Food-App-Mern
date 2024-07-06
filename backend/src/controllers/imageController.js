const Image = require('../models/imagesSchema');


const getImage=async(req,res)=>{
    try {
        // console.log(req.body)
        const productId = req.body.productId
        const image = await Image.find({productId:productId})
        // console.log(image)
        if(image){
            return res.status(200).json({images :image  ,message:[ "image found successfully"] });

        }
        else{
            return res.status(500).json({ message:[ "Couldn't found image"] });

        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message:[ "Some Error occurred "] });

    }
}

const uploadImage=async(req,res)=>{
    try {
            // console.log(req.body)
            const imgData = req.body
            await Image.create(imgData);
            return res.status(200).json({ message:[ "image uploaded successfully"] });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message:[ "Error occurred while uploading image"] });

    }
}

module.exports = {getImage,uploadImage}