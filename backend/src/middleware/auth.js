const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const auth = async (req, res, next) => {
  const token = req.header("Authorization");
  // //console.log(token);
  if (!token) { 
    // If you attempt to use an expired token, you'll receive a "401 Unauthorized HTTP" response.
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }
  else{

  // Assuming token is in the format "Bearer <jwtToken>, Removing the "Bearer" prefix"
  const jwtToken = token.replace("Bearer", "").trim();
  // //console.log(jwtToken);
  
  try {
    // Verifying the token
    const isVerified = jwt.verify(jwtToken, process.env.SECRET_KEY);
    // //console.log(isVerified);

    // getting the complete user details & also we don't want password to be sent
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0
    });
    // //console.log("user ka data " + userData);
    // .select({password: 0,});  //iska mtlb hume password nhi chahiye

    req.token = jwtToken;
    req.user = userData;
    req.userID = userData._id;

    // Move on to the next middleware or route handler
    next();
    // res.send(200).json({msg:"success"})
  
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
}
};

module.exports = auth;