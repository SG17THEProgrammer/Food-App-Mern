const Stripe = require('stripe');
const stripe = Stripe(`${process.env.STRIPE_SECRET_KEY}`);


// const stripe = new Stripe(`${import.meta.env.STRIPE_SECRET_KEY}`)
// console.log(`${process.env.STRIPE_SECRET_KEY}`)
const payment = async (req, res) => {
    console.log(req.body)
  const {products,customerInfo}=req.body

    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'Invalid product list' });
    }

    try {
        const lineItems = products.map((item) => {
            const priceInNum = parseInt(item.price, 10);
            if (!item.name || !item.image || isNaN(priceInNum) || !item.qty) {
                throw new Error('Invalid product data');
            }
            // let imageUrl = item.image;
            // if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
            //     throw new Error(`Invalid image URL: ${imageUrl}`);
            // }

            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.name,
                        // images: [imageUrl]
                    },
                    unit_amount: priceInNum * 100,
                },
                quantity: item.qty,
            };
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
            success_url: `http://localhost:5173/success`, 
            cancel_url: `http://localhost:5173/failed`,
        
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

module.exports = {payment }