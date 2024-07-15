const recommendedProducts = require('../models/recommendedFoodSchema')

const ageGroups = {
    '0-9': ['Fruit Chaat', 'Vegetable Upma', 'Oatmeal','Chicken', 'Whole Grain Bread', 'Poha', 'Mixed Nuts', 'Yogurt with Honey', 'Masala Oats', 'Baked Sweet Potato Fries'],
    '10-19': ['Vegetable Pulao', 'Grilled Chicken Tikka', 'Vegetable Kebabs', 'Quinoa Upma', 'Mango Lassi', 'Sprouts Chaat', 'Whole Wheat Chapati with Dal', 'Hummus with Veggie Sticks', 'Chana Chaat', 'Stuffed Paratha with Yogurt'],
    '20-29': ['Grilled Fish Curry', 'Tandoori Chicken Salad', 'Palak Paneer', 'Masoor Dal', 'Quinoa Salad with Chickpeas', 'Bhindi Masala', 'Whole Wheat Roti', 'Baingan Bharta', 'Mixed Vegetable Sabzi', 'Chia Seed Smoothies', 'Masala Oats'],
    '30-39': ['Lean Chicken Curry', 'Whole Wheat Chapati with Mixed Dal', 'Stir Fried Vegetables with Tofu', 'Brown Rice Pulao', 'Chickpea Salad', 'Vegetable Upma', 'Sprouts Chaat', 'Fruit Chaat', 'Yogurt with Berries', 'Almond Milk Lassi'],
    '40-49': ['Grilled Fish with Quinoa', 'Chicken Tikka Salad', 'Bharwan Karela', 'Baingan Bharta', 'Whole Wheat Roti', 'Dal', 'Mixed Vegetable Sabzi', 'Masoor Dal', 'Quinoa Upma', 'Yogurt with Honey and Nuts', 'Green Tea'],
    '50-60': ['Grilled Chicken with Brown Rice', 'Spinach Dal', 'Tofu Stir Fry', 'Whole Wheat Chapati with Palak Paneer', 'Vegetable Pulao', 'Fruit Smoothies with Yogurt', 'Sprouts Salad', 'Oatmeal with Almonds and Honey', 'Herbal Tea', 'Fenugreek Paratha'],
    '61+': ['Vegetable Soup', 'Quinoa Salad with Tofu', 'Stir Fried Vegetables', 'Mixed Berries with Almonds', 'Almond Butter on Whole Wheat Bread', 'Whole Grain Chapati with Hummus', 'Chia Seed Pudding', 'Seaweed Snacks', 'Chickpea Curry', 'Green Smoothies']
};

const getAgeGroup = (age) => {
    if (age < 10) return '0-9';
    if (age < 20) return '10-19';
    if (age < 30) return '20-29';
    if (age < 40) return '30-39';
    if (age < 50) return '40-49';
    if (age <= 60) return '50-60';
    return '61+';
};

const recommendProductsByAge = (age, recommProd) => {
    const ageGroup = getAgeGroup(age);
    const recommendedNames = ageGroups[ageGroup];
    return recommProd.filter(product => recommendedNames.includes(product.name));
};



const recommendations =async(req, res) => {
    // console.log(req.body)
    const { age ,recommProd} = req.body; 
  
    if (!age) {
        return res.status(400).json({ message: ['Enter Your Age'] });
      }

      if(age>122){
        return res.status(400).json({ message: ['Invalid age'] }); 
      }
      if(age<0){
        return res.status(400).json({ message: ['Invalid age'] }); 
      }
  
    const recommendedProducts =await  recommendProductsByAge(parseInt(age),recommProd);
    res.status(200).json({recommendedProducts});
  };


  const getRecommendedProducts=async(req,res)=>{
    try {
        const recommndProducts = await recommendedProducts.find()
        if(recommndProducts)
        res.status(200).json({recommndProducts})
    else
    res.status(400).json({message:["Couldn't find recommended products"]})

    } catch (error) {
        console.log(error)
    }
  }
  module.exports ={recommendations,recommendProductsByAge,getRecommendedProducts}