const express = require('express')
const router = new express.Router()
const {register, login, addnewitem, getproduct,payment,user, getMallproduct,contact, team, deleteUser, updateUser} = require('../controllers/controller')
const auth = require('../middleware/auth')



router.post('/register',register)
router.post('/login',login)
router.post('/addnewitem',addnewitem)
router.post('/create-checkout-session',payment)
router.post('/contact',contact)



router.get('/user',auth,user)
router.get('/getproduct',getproduct)
router.get('/getMallproduct',getMallproduct)
router.get('/team',team)

router.delete('/about/delete/:id',deleteUser)
router.patch('/about/update/:id',updateUser)



module.exports = router