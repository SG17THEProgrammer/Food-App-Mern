const mallProducts = require('../models/mallproductSchema');
const Products = require('../models/productSchema');




const addnewitem = async (req, res) => {
    try {
        //console.log(req.body)
        //console.log(req.body.database)
        if (req.body.database === "fooditem") {
            delete req.body.database;
            const data = await Products(req.body)
            await data.save()

            const allData = await Products.find()
            res.send({ message: "Upload successfully" , allItems:allData})
        }
        if (req.body.database === "mallitem") {
            delete req.body.database
          const data = await mallProducts(req.body)
          await data.save()

          const allData = await mallProducts.find()
          res.send({ message: "Upload successfully",allItems:allData })

        }

    } catch (error) {
        res.send({ message: "Error while uploading" })

    }

}
const edititem = async (req, res) => {
    const id = req.params.id;
  const updateData = req.body;

  try {
    if(req.body.database === "fooditem") {
    const updatedProduct = await Products.findByIdAndUpdate(id, updateData);
    
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    else{
    return res.status(200).json({ message: "Product updated successfully" });
    }
}
if(req.body.database==="mallitem"){
    const updatedProduct = await mallProducts.findByIdAndUpdate(id, updateData);
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    else{
    return res.status(200).json({ message: "Product updated successfully" });
    }
}
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getproduct = async (req, res) => {
  // //console.log(req.query)
  // let skip = Number(req.query.skip);
  // let limit = Number(req.query.limit) ||5;

    // const productData = await Products.find().skip(skip).limit(limit)
    const productData = await Products.find()
    // //console.log(productData)
    res.send(JSON.stringify(productData))
}


const getMallproduct = async (req, res) => {
    const prodData = await mallProducts.find()
    res.send(JSON.stringify(prodData))
}

const deleteProduct=async(req,res)=>{
try {
  // console.log(req.body)
  const {id} = req.body;
  const product = await Products.findById({_id:id})
  if(!product){
    res.status(400).json({msg:"Product not found"})
    return;
  }

  await Products.findByIdAndDelete({_id:id});
  const items = await Products.find()
  res.status(200).json({msg:"Product deleted successfully" , items:items})


} catch (error) {
  console.log(error)
  res.status(404).json({msg:"Couldn't delete product"})
}
}

const deleteMallProduct=async(req,res)=>{
try {
  // console.log(req.body)
  const {id} = req.body;
  const product = await mallProducts.findById({_id:id})
  if(!product){
    res.status(400).json({msg:"Product not found"})
    return;
  }

  await mallProducts.findByIdAndDelete({_id:id});

  const mallItems = await mallProducts.find()
  res.status(200).json({msg:"Product deleted successfully" , mallItems:mallItems})


} catch (error) {
  console.log(error)
  res.status(404).json({msg:"Couldn't delete product"})
}
}


module.exports = { addnewitem, getproduct, getMallproduct ,edititem,deleteProduct,deleteMallProduct}