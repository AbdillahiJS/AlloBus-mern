const Mongoose =require('mongoose')
const VoitureLocation =require('../model/adminModel/voitureLocationSchema.js')
const Enregistrer =require('../model/userModel/EnrigistrerModel.js')
const Booking = require('../model/userModel/bookingModel')





const AddCarRental=async(req,res)=>{



let imageUrl =req?.files?.map(file=>file?.path)


 try {

    let addRental =new VoitureLocation({
      busImage:imageUrl,
      genre:req.body.genre,
      titre:req.body.NomDeBus,
      passagers:req.body.NombreDePassager,
      climatisseur:req.body.climatisseur,
      boiteVitesse:req.body.boite,
      prix:req.body.prix
    })


  await addRental.save()
req.io.emit('item_created','create avec socket');

  res.json({message:'Ajouter une voiture de location'})
    
} catch (error) {

    res.json({})
}

}




const getAllCar=async(req,res)=>{
  const pipeline = [
    { $unwind: "$genre" }, 
      {
        $group: {
          _id: "$_id",
          totalOrders: { $sum: 1 }
        }
      },
  ];
    

 try {

 let getAllVoiture = await VoitureLocation.find()

let dashboard = await VoitureLocation.aggregate(pipeline)

    // console.log('DashBaord >',dashboard)
   
 res.json({getAllVoiture})       

    
} catch (error) {
    res.json(error)

}

}


const getSingleCarRental=async(req,res)=>{  
 try {

   let getOneCarRental = await VoitureLocation.findOne({_id:req.params.id });
   
    res.json({getOneCarRental})       
  
    } catch (error) {
        res.json(error)
    }
}



const updateSingleCarRental=async(req,res)=>{
    // console.log('updateId >',req.params.id);

    // console.log('body >',req.body);

 try {

    await VoitureLocation.findOneAndUpdate({ _id: req.params.id },{
    $set:{
        genre:req.body.editGenre,
      titre:req.body.editNomDeBus,
      passagers:req.body.editNombreDePassager,
      climatisseur:req.body.editClimatisseur,
      boiteVitesse:req.body.editBoite,
      prix:req.body.editPrix
    }, 
   },{ new: true }
   
   );
   
 res.json({message:"updated this car"})       

    
} catch (error) {
    res.json(error)
}

}



const deletSingleCarRental=async(req,res)=>{
    console.log('deleteId >',req.params.id);

 try {

    await VoitureLocation.findOneAndDelete({ _id: req.params.id });
    req.io.emit('item_deleted','deleted avec socket');
   
 res.json({message:'Supprimer une voiture location'})       

    
} catch (error) {
    res.json(error)
}

}

const dashBoardSquareResulte=async(req,res)=>{
  
 try {

   let [countCarRental,countUsers,countBooking] = await Promise.all([
    VoitureLocation.countDocuments(),
       Enregistrer.countDocuments(),
       Booking.countDocuments()
    ])

  //   let countActiveUser =await Enregistrer.find({isActive:true}).countDocuments()
  //   let countNotActiveUser =await Enregistrer.find({isActive:false}).countDocuments()
  // console.log('countActiveUser > ',countActiveUser);
  // console.log('countNotActiveUser > ',countNotActiveUser);
    res.json({countCarRental,countUsers,countBooking})

  } catch (error) {
    console.log(error)
  }
}

 const usersSquareResulte=async(req,res)=>{
  
  try {

    let [countActiveUser,countNotActiveUser] = await Promise.all([
  
     Enregistrer.find({isActive:true}).countDocuments(),
     Enregistrer.find({isActive:false}).countDocuments()
 
    ])
 console.log('countActiveUser > ',countActiveUser);
   console.log('countNotActiveUser > ',countNotActiveUser);
    res.json({countActiveUser,countNotActiveUser})
  
  } catch (error) {
    console.log(error)
   }
 }
    



const getAllUsersReservation=async(req,res)=>{
  
  try {

   let usersReservation=await Booking.find({})
   console.log('usersReservation > ',usersReservation)

    res.json({usersReservation})
    
  } catch (error) {
    console.log(error);
    res.json({ message: `Server error in getAllUserReservation > ${err.message}` })
  }

}



function countDown(prise, retour) {
  let days, hours, minutes, seconds;

  const start = new Date(prise);
  const end = new Date(retour);
  const now = new Date();

  if (now >= start) {

    const diffTotal = end - start; // in ms
    const diffSinceStart = now - start; // in ms
    const remaining = Math.max(diffTotal - diffSinceStart, 0); // in ms

    days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  } else {

    const tripLength = end - start; // in ms

    days = Math.floor(tripLength / (1000 * 60 * 60 * 24));
    hours = Math.floor((tripLength % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((tripLength % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((tripLength % (1000 * 60)) / 1000);
  }

 return {days,hours,minutes,seconds}
  
}
  



const singleUserReservation=async(req,res)=>{

  try {

   let SingleUserReservation=await Booking.findOne({_id:req.params.userBookingId}).populate('reservateurId voitureId')

   let countD=countDown(SingleUserReservation?.datePrise,SingleUserReservation?.dateRetour)
  
   res.json({SingleUserReservation,countD})
    
  } catch (error) {
    console.log(error);
    res.json({ message: `Server error in SingleUserReservation > ${err.message}` })
  }

}




const updateUserReservation=async(req,res)=>{

  try {

  await Booking.findOneAndUpdate({_id:req.params.userBookingId},{
    $set:{
      rendu:req.body.voitureRendu
    }
   })
  
 req.io.emit('Rendu','All the reservation');

    res.json({message:`L'utilisateur a bien rendu la voiture de location`})
    
  } catch (error) {
    console.log(error);
    res.json({ message: `Server error in updateUserReservation > ${err.message}` })
  }

}


// const singleUserInfo=async(req,res)=>{

//   try {


//  req.io.emit('Rendu','All the reservation');

//     res.json({message:`L'utilisateur a bien rendu la voiture de location`})
    
//   } catch (error) {
//     console.log(error);
//     res.json({ message: `Server error in updateUserReservation > ${err.message}` })
//   }

// }






module.exports={AddCarRental,getAllCar,getSingleCarRental,
  deletSingleCarRental,
  updateSingleCarRental,
  dashBoardSquareResulte,
  getAllUsersReservation,
  singleUserReservation,
  updateUserReservation,
  usersSquareResulte
 
}