const User = require("../models/userSchema")
const { sendEmailforToken } = require("./emailController")
const crypto = require("crypto")
const forgotPassword =async(req,res)=>{
    try {
        console.log(req.body)
        const {email} = req.body

        const user = await User.findOne({email})

        if(!user){
            res.status(400).json({msg: "User not found"});
            return;
        }

        const resetToken = await user.getResetToken();

        await user.save();
        // Send token to email
        const url = `${process.env.Frontend_URL}/resetpassword/${resetToken}`


        const message = `Click on the link to reset your password : ${url} . If you have not requested this pls ignore this mail.`

        await sendEmailforToken(email,"Mail for Reset Password",message);



        res.status(200).json({msg: `Reset token sent to  ${email} successfully`});


    } catch (error) {
        console.log(error)
        res.status(404).json({msg: "Error in sending token"});
    }
}

const resetPassword=async(req,res)=>{
    try {
        // make sure ki jo route mein : ke baad naam de rakha usse naam ko yahan likhe 
        const {token} = req.params;
        const {password} = req.body
        console.log(password)
        const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken,resetPasswordExpires:{
                $gt:Date.now()
            }
        })
        
        if(!user) {
            res.status(404).json({msg: "Token is invalid or is expired"});
            return ;
        }

        user.password = password
        user.resetPasswordExpires=undefined;
        user.resetPasswordToken = undefined;

            await user.save();
        res.status(200).json({success: "true" , msg:"Password updated successfully"});


    } catch (error) {
        console.log(error)
        res.status(404).json({msg: "Error in updating password"});
    }
}


module.exports ={forgotPassword,resetPassword}