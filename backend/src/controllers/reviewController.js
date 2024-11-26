
const Products = require('../models/productSchema');
const Review = require('../models/reviewSchema');
const mallProducts = require('../models/mallproductSchema');

const postReview = async (req, res) => {
  try {
      const { rating, userName ,productId,comment} = req.body;
      console.log(rating, userName ,productId,comment)

      if(userName==undefined){
        return res.status(400).json({ message: ["Pls login to give review"] });
   }

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
      console.log(error)
        // return res.status(500).json({ message:[ "Error occurred while sending review"] });
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
  
  module.exports = { postReview,getReview,deleteReview}