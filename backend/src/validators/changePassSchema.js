const z = require("zod");

// creating a schema for strings
const changePassSchema = z.object({
    email: z
        .string({ required_error: "email is required" })
        .trim()
        .email({ message: "Email is required" }),
    otp: z
        .string({ required_error: "OTP is required" })
        .trim()
        .min(6, { message: "OTP should be of 6 characters" }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(6, { message: "password must be of  at least 6 characters" }),

    confirmpassword: z
        .string({ required_error: "confirmpassword is required" })
        .trim()
        .min(6, { message: "confirmpassword must be of same length as of password" })
});

module.exports = changePassSchema