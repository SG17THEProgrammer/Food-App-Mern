const Stripe = require('stripe');
const stripe = Stripe(`${process.env.STRIPE_SECRET_KEY}`);
const delivery_add = require('../models/deliverySchema');
const order = require('../models/orderSchema');

const payment = async (req, res) => {
    console.log(req.body)
  const {products,customerInfo,deliveryCharge,tax,userId,amount}=req.body

    try {

        const newOrder = new order({
                userId: userId,
                items: products,
                amount:amount,
                address: customerInfo.address
        })
        await newOrder.save()
        // await User.findByIdandUpdate(userId,{cartItems:{}});


        const lineItems = products.map((item) => {
            const priceInNum = parseInt(item.price, 10);
            if (!item.name || !item.image || isNaN(priceInNum) || !item.qty) {
                throw new Error('Invalid product data');
            }
        
            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.name,
                        // images: [imageUrl]
                        // image ka url should start with https://....
                    },
                    unit_amount: priceInNum * 100,
                },
                quantity: item.qty,
               
            };
        });

        lineItems.push({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: 'Delivery Charge',
                },
                unit_amount: deliveryCharge*100,
            },
            quantity: 1,
        });

        lineItems.push({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: 'Tax',
                },
                unit_amount: tax*100,
            },
            quantity: 1,
        });
        

        const params = {
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            payment_intent_data: {
                shipping: {
                    name: customerInfo.name,
                    address: customerInfo.address
                    
                }
            },
            // success_url: `http://localhost:5173/success`, 
            // cancel_url: `http://localhost:5173/failed`,
            success_url: `http://localhost:5173/verify?success=true&orderId=${newOrder._id}`, 
            cancel_url: `http://localhost:5173/verify?success=false&orderId=${newOrder._id}`,
        
        };
        const { country } = customerInfo.address;
        if (country && country !== 'IN') {
            console.log('Shipping address country:', country); // Log the shipping address country for debugging

            params.billing_address_collection = 'required';
            params.shipping_address_collection = {
                allowed_countries: ['US', 'CA', 'GB', 'AU','IN'] // Add other allowed countries outside India
            };
        }
        const session = await stripe.checkout.sessions.create(params);
        console.log('Created session:', session);
        res.status(200).json({ id: session.id });
    } catch (err) {
        console.error('Error creating session:', err);
        res.status(err.statusCode || 500).json({ error: err.message });
    }
}

const delivery=async(req,res)=>{
    try {
        console.log(req.body)
        
        const {delDetails,userId} = req.body
        const {name,email,phone,address,message,city,pincode,state}  = delDetails
        const delData = {
            name,email,phone,address,message,city,pincode,state,userId
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

module.exports = {payment , delivery }