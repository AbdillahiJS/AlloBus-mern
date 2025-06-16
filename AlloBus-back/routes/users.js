const express = require('express');
const users =express.Router()
const auth =require('../middleware/verifyToken.js')
const {uploadProfile}=require('../uploadMulter.js') 

const {enregistrer,connecter,getConfirmation,getAllUsers,booking,getBooking,getMyReservation,userProfile,addImageProfile,completeRegistration } =require('../controller/usersController')


const uploadProfileImage = uploadProfile("profile");



users.get('/',getAllUsers)
users.get('/booking/:bookingId',auth,getBooking)
users.get('/myrervation',auth,getMyReservation)
users.post('/enregistrer',enregistrer)
users.post('/connecter',connecter)
users.post('/profile/upload',auth,uploadProfileImage.single('profileImg'),addImageProfile)
users.post('/booking',auth,booking)
users.get('/confirmation/:confirmationId',getConfirmation)
users.get('/profile',auth,userProfile)
users.post('/completeRegistration',auth,completeRegistration)




module.exports =users