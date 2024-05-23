//Note -- login ke liye alag schema ki jagah we could also use .extend property of zod 
//loginSchema = z.object ...
    // email,
    // password,
// signupSchema = loginSchema.extend ...
        //firstname,
        //lastname,
        //phone ,
        //confirmpassword

const z = require("zod");

const loginSchema = z.object({
    email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(5, { message: "Email must be at least 5 characters long" })
    .max(100, { message: "Email must be less than 100 characters long" })
    .trim(),
    password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(100, { message: "Password must be less than 100 characters long" })
    .trim(),
});

module.exports = loginSchema