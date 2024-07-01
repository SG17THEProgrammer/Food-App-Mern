const mallProducts = require('../models/mallproductSchema');
const Products = require('../models/productSchema');
const Review = require('../models/reviewSchema');




const addnewitem = async (req, res) => {
    try {
        //console.log(req.body)
        //console.log(req.body.database)
        if (req.body.database === "fooditem") {
            delete req.body.database;
            const data = await Products(req.body)
            await data.save()
        }
        if (req.body.database === "mallitem") {
            delete req.body.database
          const data = await mallProducts(req.body)
          await data.save()

        }
        res.send({ message: "Upload successfully" })

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



const postReview = async (req, res) => {
  try {
    //console.log(req.body)
    const { review, userName ,productId} = req.body;
    const { rating, comment } = review;
    
    const reviewData = {
      rating,
      comment,
      userName,
      productId
    };
    if(!rating){
         return res.status(400).json({ message: ["Can't post without star rating"] });

    }
    if(!comment){
         return res.status(400).json({ message: ["Can't post without comment"] });

    }
    const newReview = new Review(reviewData);
    await newReview.save();

    const ratings = await Review.find({ productId });
    // //console.log(ratings)
    const ratingSum = ratings.reduce((sum, rate) => sum + rate.rating, 0);
    // //console.log(ratingSum)
    let averageRating = ratings.length >0 ? ratingSum / ratings.length:0;
    averageRating = Math.round(averageRating*10) / 10;    
     //console.log(averageRating)
    const updtProduct = await Products.findByIdAndUpdate(productId, { rating: averageRating });
  let updtMallProduct
    if(!updtProduct){
   updtMallProduct = await mallProducts.findByIdAndUpdate(productId, { rating: averageRating });

      }
      if(!updtMallProduct && !updtProduct){
        return res.status(500).json({ message:[ "Product Id not found "] });

      }


      return res.status(200).json({ message:[ "Review saved successfully"] });

  } catch (error) {
      return res.status(500).json({ message:[ "Error occurred while sending review"] });
  }
}

const getReview = async (req, res) => {
  const { productId } = req.query;
  try {
      const reviews = await Review.find({ productId });
      if (reviews.length > 0) {
      res.status(200).json({reviews});
      }
      else {
        res.status(404).json({message:['No reviews found ']});
    }
  } catch (error) {
      res.status(500).send(error.message);
  }
}

const deleteReview = async (req, res) => {
  try {
    const {id,productId} = req.params
      const review = await Review.findByIdAndDelete({ _id: id });
      //console.log(review)
      if (!review) {
          return res.status(404).json({ message: "Review not found" });
      }
      else{
        const ratings = await Review.find({ productId });
    // //console.log(ratings)
    const ratingSum = ratings.reduce((sum, rate) => sum + rate.rating, 0);
    // //console.log(ratingSum)
    let averageRating = ratings.length >0 ? ratingSum / ratings.length:0;
    averageRating = Math.round(averageRating*10) / 10;    
     //console.log(averageRating)
    const updtProduct = await Products.findByIdAndUpdate(productId, { rating: averageRating });
  let updtMallProduct
    if(!updtProduct){
   updtMallProduct = await mallProducts.findByIdAndUpdate(productId, { rating: averageRating });

      }
      if(!updtMallProduct && !updtProduct){
        return res.status(500).json({ message:[ "Product Id not found "] });

      }
    
      return res.status(200).json({ message: "Review deleted successfully" });
      }
  } catch (error) {
      return res.status(500).json({ message: "Error occurred while deleting review" });
  }
}

module.exports = { addnewitem, getproduct, getMallproduct ,edititem,postReview,getReview,deleteReview}