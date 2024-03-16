const User = require('../models/userSchema')
const Products = require('../models/productSchema');
const mallitems = require('../models/mallproductSchema');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const stripe = require('stripe')("sk_test_51OkP1CSGM4q7z7zW1GKYbXA167RscGiUnjJJlGbZ5tLYGyeTvzwzVPuynjb3Hmv1fUoH94bNeZUvyNl9AfKocOs80000wDhUIR")
const bcrypt = require('bcryptjs')
const Contact = require('../models/contactSchema');
const Team = require('../models/teamSchema');
const mallProducts = require('../models/mallproductSchema');


const register = async (req, res) => {

    try {
        const { name, email, phone, password, image } = req.body
        // console.log(req.body);

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            res.status(404).json({ message: 'email already exist' })
        }
        else {

            //For hashing we could write like this or in userSchema file can set pre method

            // const hashPassword = await bcrypt.hash(password,10)
            // 10=>salt round
            // console.log(hashPassword)
            // const hashCnfrmPassword = await bcrypt.hash(password,10)
            // console.log(hashCnfrmPassword)
            // if (password === confirmpassword) {
            //     const registerUser = new User({
            //         firstname, lastname, email, phone, password:hashPassword, confirmpassword:hashCnfrmPassword
            //     })



            const registerUser = new User({
                name, email, phone, password, image
            })

            console.log(registerUser)
            const register = await registerUser.save()
            // console.log(register);


            res.status(200).json({
                msg: 'user registered successfully'
                ,
                // userData:registerUser,
                token: await registerUser.generateToken(),
                userID: registerUser._id.toString()
            });


            // console.log(registerUser);

        }

    }

    catch (error) {
        console.log(error)
    }

}

const user = async (req, res) => {
    try {
        // console.log(req.user)
        const userData = req.user;
        // console.log(userData);

        return res.status(200).json({ userData })
        // return res.status(200).json({msg:"hi user"})


    } catch (error) {
        res.status(404).send(error)
    }
}

const login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        // console.log(req.body)
        // console.log("email"+ email)
        // console.log(password)

        const userExist = await User.findOne({ email })
        // console.log("user" + userExist)

        if (!userExist) {
            res.status(404).json({ msg: "Invalid password or email " })
        }
            //directly password match krwa liya 
            // const isMatch = await bcrypt.compare(password,userExist.password )

            //yahan comparePass is in userSchema file 
            const isMatch = await userExist.comparePass(password)
            // console.log("ismatch "+ isMatch)

if(isMatch){
            res.status(200).json({
                msg: 'login successful',
                // data: user,
                token: await userExist.generateToken(),
                userID: userExist._id.toString()
            });

        }
            else {
                res.status(404).json({ msg: "Invalid password or email " })

            }

    } catch (error) {
        res.status(404).send(error)
        // res.status(404).json({ msg: "Server prblm" })


    }
}

const addnewitem = async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.body.database)
        if(req.body.database==="fooditem"){
            delete req.body.database;
        const data = await Products(req.body)   
        const datasave = await data.save()
        // console.log(datasave)
    }
    if(req.body.database==="mallitem"){
        delete req.body.database
        const data = await mallitems(req.body)   
        const datasave = await data.save()

    }   
        res.send({ message: "Upload successfully" })

    } catch (error) {
        res.send({ message: "Error while uploading" })

    }

}

const getproduct = async (req, res) => {
    const productData = await Products.find()
    res.send(JSON.stringify(productData))
}
    
const getMallproduct = async (req, res) => {
    const prodData = await mallProducts.find()
    res.send(JSON.stringify(prodData))
}


const contact = async (req, res) => {
    try {
        const user = req.body;
        // console.log(req.body)
        await Contact.create(user);
        return res.status(200).json({ message: "message send successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "message not delivered" });
    }
}

const team = async (req, res) => {
    try { 
        // console.log('hi')
        const user = await Team.find()
        // console.log("user data" + user);
        if (!user) {
            res.status(404).send('No Info found')
            return;
        }
        else {
            return res.status(200).json({user });
        }
    } catch (error) {
        res.status(400).send(error)
    }
} 


const deleteUser = async(req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        if (id){    

            await User.findByIdAndDelete({_id: id});
            // res.redirect("/home")
            return  res.status(200).json({msg:"Account Deleted Successfully"})
        }
        else{
            res.status(404).send('No Id found')
        }

    } catch (error) {
        res.status(400).send(error)     
    }


}

const updateUser = async(req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        // const {name,phone,email} = req.body    
        // console.log(updatedUserData)
        if (id){

           const updatedData =  await User.findByIdAndUpdate({_id: id},{$set:{...req.body}});
            // res.redirect("/home")
            // console.log(updatedData)
            await updatedData.save()
            
              res.status(200).json({msg:"Account Updated Successfully",updatedData})
        }
        else{
            res.status(404).send('No Id found')
        }

    } catch (error) {
        res.status(400).send(error)     
    }


}

// console.log(process.env.STRIPE_SECRET_KEY)


// const stripe = new Stripe(`${import.meta.env.STRIPE_SECRET_KEY}`)
const payment = async (req, res) => {
    console.log("product ki list" + req.body) 
    const products=req.body;

    try {
        const params = {
            // submit_type: 'pay',
            // mode: "payment",
            payment_method_types: ['card'],
            // billing_address_collection: "auto",
            // shipping_options: [{ shipping_rate: "shr_1OhGVwSFXDPvNaqQFgLJC0AJ" }],

            line_items: products.map((item) => {
                const priceInNum = parseInt(item.price.replaceAll("$", ""))
                // console.log(typeof(priceInNum))
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.name,
                            images : [item.image]
                        },
                        unit_amount: priceInNum * 100,
                    },
                    // adjustable_quantity: {
                    //     enabled: true,
                    //     minimum: 1,
                    // },
                    quantity: item.qty,
                }
            }),
            mode:"payment", 
            success_url: `http://localhost:5173/success`,
            cancel_url: `http://localhost:5173/failed`,

        }


        const session = await stripe.checkout.sessions.create(params)
        console.log("hiiiiii", session)

        res.status(200).json({id:session.id})
    }
    catch (err) {
        res.status(err.statusCode || 500).json(err.message)
    }



}


module.exports = { register, login, addnewitem, getproduct, payment,user ,contact ,team ,deleteUser,updateUser ,getMallproduct}