const z = require("zod");

// creating a schema for strings
const contactSchema = z.object({
    name: z
    .string({ required_error: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must be less than 50 characters long" })
    .trim(),

    email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" })
    .min(5, { message: "Email must be at least 5 characters long" })
    .max(100, { message: "Email must be less than 100 characters long" })
    .trim(),
    message: z
        .string({ required_error: "Message is required" })
        .min(2, { message: "message must be of at least 2 characters" })
        .max(500, { message: "message must not exceed 500 words" })
        .trim()

});

module.exports = contactSchema