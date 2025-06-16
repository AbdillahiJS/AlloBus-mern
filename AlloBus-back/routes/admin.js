const express = require('express');
const admin =express.Router()
const {AddCarRental, getAllCar, deletSingleCarRental,getSingleCarRental,updateSingleCarRental,
        dashBoardSquareResulte,getAllUsersReservation,singleUserReservation,
        updateUserReservation,usersSquareResulte,singleUserInfo} =require('../controller/adminController.js')
const {uploadMulter}=require('../uploadMulter.js') 


 
const upload = uploadMulter("carFolder");



// obtenir Tout Voitures

admin.get('/',getAllCar)
admin.get('/dashboard',dashBoardSquareResulte)
admin.get('/usersDashboard',usersSquareResulte)
admin.post('/',upload.array('Img',4),AddCarRental)

admin.get('/AllUsersReservation',getAllUsersReservation)
admin.get('/userInfo/:userId',singleUserInfo)
admin.get('/userBooking/:userBookingId',singleUserReservation)
admin.put('/userBooking/:userBookingId',updateUserReservation)
admin.get('/:id',getSingleCarRental)
admin.put('/:id',updateSingleCarRental)
admin.delete('/:id',deletSingleCarRental)








module.exports=admin