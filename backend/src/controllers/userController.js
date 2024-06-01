
const User = require('../models/userSchema')
const bcrypt = require('bcryptjs')


const register = async (req, res) => {

    try {
        const { name, email, phone, password, image } = req.body
        // console.log(req.body);

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            res.status(404).json({ message: ["email already exist"] })
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



         if(name&& email&&phone&&password&&image){   
            const registerUser = new User({
                name, email, phone, password, image
            })

            console.log(registerUser)
            const register = await registerUser.save()
            // console.log(register);


            res.status(200).json({
                message: ['Registered successfully']
                ,
                // userData:registerUser,
                token: await registerUser.generateToken(),
                userID: registerUser._id.toString()
            });}
            else{
                res.status(400).json({
                    message: ['Image is required']
                })
            }   


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
        // return res.status(200).json({message:"hi user"})


    } catch (error) {
        res.status(404).send(error)
    }
}

const getallusers = async (req, res) => {
    try {
        const allUsers = await User.find();
        return res.status(200).json({ allUsers })

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
            res.status(404).json({ message: ["Invalid password or email "] })
        }
        //directly password match krwa liya 
        // const isMatch = await bcrypt.compare(password,userExist.password )

        //yahan comparePass is in userSchema file 
        const isMatch = await userExist.comparePass(password)
        // console.log("ismatch "+ isMatch)

        if (isMatch) {
            res.status(200).json({
                message: ['login successful'],
                // data: user,
                token: await userExist.generateToken(),
                userID: userExist._id.toString()
            });

        }
        else {
            res.status(404).json({ message: ["Invalid password or email "] })

        }

    } catch (error) {
        res.status(404).send(error)
        // res.status(404).json({ message: "Server prblm" })


    }
}




const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        if (id) {

            await User.findByIdAndDelete({ _id: id });
            // res.redirect("/home")
            return res.status(200).json({ message: ["Account Deleted Successfully"] })
        }
        else {
            res.status(404).send('No Id found')
        }

    } catch (error) {
        res.status(400).send(error)
    }


}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { email, ...otherFields } = req.body;

        if (id) {
            const emailExists = await User.findOne({ email, _id: { $ne: id } });

            if (emailExists) {
                return res.status(400).json({ message: ['Email already exists'] });
            }

            const updatedData = await User.findByIdAndUpdate(
                { _id: id },
                { $set: { email, ...otherFields } },
                { new: true } 
            );

            if (!updatedData) {
                return res.status(404).json({ message: ['User not found'] });
            }

            res.status(200).json({ message: ['Account Updated Successfully'], updatedData });
        } else {
            res.status(404).json({ message: ['No Id found'] });
        }

    } catch (error) {
        res.status(400).json({ message: ['Error fetching API'], error: error.message });
    }
};




module.exports = { register, login, user ,updateUser,deleteUser,getallusers}