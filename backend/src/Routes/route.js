const express = require('express')
const router = new express.Router()
const {contact, team, reserveTable} = require('../controllers/controller')
const auth = require('../middleware/auth')
const { register, login, user, deleteUser, updateUser, getallusers } = require('../controllers/userController')
const { addnewitem, getproduct, getMallproduct ,edititem, deleteProduct, deleteMallProduct} = require('../controllers/productController')
const validate = require('../middleware/validate') 
const signupSchema = require('../validators/signupSchema')
const loginSchema = require('../validators/loginSchema')
const contactSchema = require('../validators/contactSchema')
const aboutSchema = require('../validators/aboutSchema')
const { payment } = require('../controllers/paymentController')
const { delivery,updateDeliveryStatus, getDeliveryAddress,deliveryMan, deleteDeliveryDetails } = require('../controllers/deliveryController')
// const { distance } = require('../controllers/locationController')
const { verifyOrder, getOrder, showOrder, getAllOrders } = require('../controllers/orderController')
const { getImage, uploadImage } = require('../controllers/imageController')
const { sendEmail } = require('../controllers/emailController')
// const { chat } = require('../controllers/chatbotController')
const { recommendations, getRecommendedProducts } = require('../controllers/recommendationController')
const { resetPassword, forgotPassword } = require('../controllers/passwordController')
const { postReview, getReview, deleteReview } = require('../controllers/reviewController')
const { getQuestion } = require('../controllers/qaController')
// const { generateInvoice } = require('../controllers/invoiceController')



router.post('/register',validate(signupSchema),register)
router.post('/login',validate(loginSchema),login)
router.post('/addnewitem',addnewitem)
router.post('/payment',payment)
router.post('/postReview',postReview)
router.post('/delivery',delivery)
router.post('/verify',verifyOrder)
router.post('/getOrder',getOrder)
router.post('/showOrder',showOrder)
router.post('/reservation',reserveTable)
router.post('/updateDeliveryStatus',updateDeliveryStatus)
router.post('/getDeliveryAddress',getDeliveryAddress)
router.post('/getImage',getImage)
router.post('/uploadImage',uploadImage)
router.post('/sendEmail',sendEmail)
// router.post('/chat',chat)
router.post('/recommendations',recommendations)
router.post('/forgotpassword',forgotPassword)
// router.post('/generateInvoice',generateInvoice)
router.post('/contact',validate(contactSchema),contact)
router.post('/deleteProduct',deleteProduct)
router.post('/deleteMallProduct',deleteMallProduct)
router.post('/deleteDeliveryDetails',deleteDeliveryDetails)




router.get('/user',auth,user)
router.get('/allusers',getallusers)
router.get('/getproduct',getproduct)
router.get('/getMallproduct',getMallproduct)
router.get('/team',team)
router.get('/getReview',getReview)
router.get('/getAllOrders',getAllOrders)
router.get('/deliveryMan',deliveryMan)
router.get('/recommndProducts',getRecommendedProducts)
// router.get('/distance',distance)
router.get('/question',getQuestion)



router.delete('/about/delete/:id',deleteUser)
router.delete('/deleteReview/:id/:productId',deleteReview)



router.patch('/about/update/:id',validate(aboutSchema),updateUser)
router.patch('/edititem/:id',edititem)



router.put('/resetpassword/:token',resetPassword)


module.exports = router