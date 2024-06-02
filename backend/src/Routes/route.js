const express = require('express')
const router = new express.Router()
const {contact, team} = require('../controllers/controller')
const auth = require('../middleware/auth')
const { register, login, user, deleteUser, updateUser, getallusers } = require('../controllers/userController')
const { addnewitem, getproduct, getMallproduct ,edititem, postReview, getReview, deleteReview} = require('../controllers/productController')
const validate = require('../middleware/validate') 
const signupSchema = require('../validators/signupSchema')
const loginSchema = require('../validators/loginSchema')
const contactSchema = require('../validators/contactSchema')
const aboutSchema = require('../validators/aboutSchema')
const { payment } = require('../controllers/paymentController')



router.post('/register',validate(signupSchema),register)
router.post('/login',validate(loginSchema),login)
router.post('/addnewitem',addnewitem)
router.post('/payment',payment)
router.post('/postReview',postReview)
router.post('/contact',validate(contactSchema),contact)




router.get('/user',auth,user)
router.get('/allusers',getallusers)
router.get('/getproduct',getproduct)
router.get('/getMallproduct',getMallproduct)
router.get('/team',team)
router.get('/getReview',getReview)

router.delete('/about/delete/:id',deleteUser)
router.delete('/deleteReview/:id',deleteReview)
router.patch('/about/update/:id',validate(aboutSchema),updateUser)
router.patch('/edititem/:id',edititem)



module.exports = router