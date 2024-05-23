const z = require("zod");

const forgotPassSchema = z.object({
    email: z
        .string({ required_error: "email is required" })
        .trim()
        .email({ message: "Email is required" })

})

module.exports = forgotPassSchema