const express = require('express');
const users =express.Router()
const auth =require('../middleware/verifyToken.js')

const {enregistrer,connecter,getConfirmation,getAllUsers,booking,getBooking,getMyReservation} =require('../controller/usersController')

users.get('/',getAllUsers)
users.get('/booking/:bookingId',auth,getBooking)
users.get('/myrervation',auth,getMyReservation)
users.post('/enregistrer',enregistrer)
users.post('/connecter',connecter)
users.post('/booking',auth,booking)
users.get('/confirmation/:confirmationId',getConfirmation)






module.exports =users