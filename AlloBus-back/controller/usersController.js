// const Mongoose =require('mongoose')
const Enregistrer =require('../model/userModel/EnrigistrerModel.js')
const bcrypt =require('bcryptjs')
const jwt =require('jsonwebtoken')
const nodemailer = require('nodemailer');
const emailTemplate=require('../emailTemplate.js')
const Booking =require('../model/userModel/bookingModel')
const cloudinary =require('../utile')
const requestIp = require("request-ip");
const dayjs = require('dayjs')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bs141.19109906.1@gmail.com',
    pass: 'swcl iopc vhab jjmi' 
  }
});

const sendConfirmationEmail = async (email, token) => {
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const url = `http://localhost:5173/confirmation/${token}/${decoded.userId}`;

      await transporter.sendMail({
        from:'"AlloBus" <bs141.19109906.1@gmail.com>', 
        to: email,
        subject:'Confirm Email',
        html: `
        <div style="font-family:Arial, sans-serif; line-height:1.5;">
          <h2>Bienvenue sur AlloBus !</h2>
          <p>Merci de vous être inscrit. Veuillez confirmer votre adresse e-mail en cliquant sur le lien ci-dessous </p>
          <a href="${url}" style="display:inline-block; padding:10px 15px; background-color:#007bff; color:#fff; text-decoration:none; border-radius:5px;">Confirmer mon e-mail</a>
    
        </div>
      `,
      });

  }catch(error){

     res.json({ message: `Server error in Registration ${error.message}` }); 
  }

};




let enregistrer=async(req,res)=>{
    console.log(req.body)
    const { email, password,nom,prenom } = req.body;
      try {
        const existingUser = await Enregistrer.findOne({ email });

        if (existingUser?.email) return res.json({ message: `L'utilisateur est deja dans le base de donnee` });
    
        const crypteMdp = await bcrypt.hash(password, 10);
        
        let user =new Enregistrer({
          prenom,
          nom,
          email,
          password:crypteMdp,
        })
        console.log('checking >',user)
        
        await user.save()

       

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        await sendConfirmationEmail(email,token)
        
    
        return res.json({ message: `Utilisateur est bien belle Enrigistrer il vous reste confirmer votre address Email` });
      } catch (error) {
        
         res.json({ message: `Server error in Registration ${error.message}` });
      }
    
}


 let connecter =async(req, res) => {

    const { emailSignIn, passwordSignIn} = req.body;

    try {
      const utilisateur = await Enregistrer.findOne({email:emailSignIn});
      if (!utilisateur) return res.json({ message: `Cet utilisateur n'existe pas` });

      if (!utilisateur.isActive) return res.json({ message: `Cet utilisateur n'a pas encore confirme l'address email ` });
      
      
      const isMatch = await bcrypt.compare(passwordSignIn, utilisateur.password);
      if (!isMatch) return res.json({ message:'Mot de passe Invalide' });
  
      const token = jwt.sign({ userId: utilisateur._id }, process.env.JWT_SECRET);
     return res.json({token,message:'Vous etes Connecter'});
    } catch (error) {
     return res.json({ message: `Server error in connexion > ${error.message}` });
    }
  };




  let getConfirmation=async(req,res)=>{

  try {

    await Enregistrer.findOneAndUpdate({_id:req.params.confirmationId},{
      $set:{
         isActive:true
      }
    })

    res.json({message:`Utilisateur a bien Confirme l'email vous pouvez se connecter pour continuer Louer`})
     
  } catch (error) {
    res.json({ message: `Server error in getConfirmation > ${error.message}` })
  }

  }


  const getAllUsers=async(req,res)=>{

    try {
      let getAllUsers = await Enregistrer.find()

      res.json({getAllUsers})
      
    } catch (error) {
      res.json({ message: `Server error in getAllUsers > ${error.message}` })
    }

  }




  const booking=async(req,res)=>{
    console.log('total >',req.body)

    try {
     let reservez =new Booking({
      datePrise: req.body.prise,
      dateRetour: req.body.retour,
      totalPrix: req.body.prixTotal,
      reservateurId: req.decoded.userId,
      voitureId: req.body.voitureId,
      daysRemaining: req.body.days,
     })

     await reservez.save()
    
      res.json({message:'felicitation de Reservez'})
      
    } catch (error) {
      console.log(error);
      res.json({ message: `Server error in booking > ${error.message}` })
    }

  }


  function countDown(prise, retour) {
    let days, hours, minutes, seconds;
  
    const start = dayjs(prise);
    const end = dayjs(retour);
    const now = dayjs();
  
    if (now.isAfter(start) || now.isSame(start)) {
      // Case: trip already started
      const diffTotal = end.diff(start, 'second');       // in seconds
      const diffSinceStart = now.diff(start, 'second');  // in seconds
      const remaining = Math.max(diffTotal - diffSinceStart, 0); // remaining in seconds
  
      days = Math.floor(remaining / (60 * 60 * 24));
      hours = Math.floor((remaining % (60 * 60 * 24)) / (60 * 60));
      minutes = Math.floor((remaining % (60 * 60)) / 60);
      seconds = remaining % 60;
  
    } else {
      // Case: trip not yet started
      const tripLength = end.diff(start, 'second'); // total trip duration in seconds
  
      days = Math.floor(tripLength / (60 * 60 * 24));
      hours = Math.floor((tripLength % (60 * 60 * 24)) / (60 * 60));
      minutes = Math.floor((tripLength % (60 * 60)) / 60);
      seconds = tripLength % 60;
    }
  
    return { days, hours, minutes, seconds };
  }









   const getBooking=async(req,res)=>{
  
     try {

     let getAllBooking= await Booking.findOne({reservateurId:req.decoded.userId,voitureId:req.params.bookingId}).populate('reservateurId')

    //  if(getAllBooking?.rendu){

    //   await Booking.findOneAndUpdate({reservateurId:req.decoded.userId,voitureId:req.params.bookingId},{
    //     $set:{
    //       rendu:true
    //     }
    //   })

    //  }
  
      res.json({getAllBooking})
      
     } catch (error) {
       console.log(error);
       res.json({ message: `Server error in getBooking > ${error.message}` })
    }

   }



  const getMyReservation=async(req,res)=>{

    try {

     let getAllMyReservation=await Booking.find({reservateurId:req.decoded.userId}).populate('reservateurId voitureId').sort({createdAt:-1})

     let oneBookingNotCOmpleted= await Booking.findOne({reservateurId:req.decoded.userId,completed:false})

     const result= countDown(oneBookingNotCOmpleted?.datePrise,oneBookingNotCOmpleted?.dateRetour)

    

     if(result?.days === 0){

      await Booking.findOneAndUpdate({reservateurId:req.decoded.userId,_id:oneBookingNotCOmpleted?._id,completed:false},{
        $set:{
          completed:true
        }
      })

    }
//  console.log('oneBookingNotCOmpleted > ',oneBookingNotCOmpleted)

 


     req.io.emit('myReservation','All the reservation');

      res.json({getAllMyReservation})
      
    } catch (error) {

      console.log(error);
      res.json({ message: `Server error in getMyReservation > ${err.message}` })
      
    }

  }


  const userProfile=async(req,res)=>{
    const ip = requestIp.getClientIp(req)
    const information = {
      ip,
      userAgent: req.useragent,
    };

  
    try {
          
  
          let [userInfo,userInfoReservation] = await Promise.all([
    
            Enregistrer.findOne({_id:req.decoded.userId}),
            Booking.find({reservateurId:req.decoded.userId}).sort({createdAt:-1})
        
           ])
  
  
  
      res.json({userInfo,userInfoReservation,information})
      
    } catch (error) {
      console.log(error);
      res.json({ message: `Server error in singleUserInfo > ${err.message}` })
    }
  
  }




  const addImageProfile=async(req,res)=>{
   
    try {
      let getPublicIdProfile = await Enregistrer.findOne({_id:req.decoded.userId}).select('publicIdProfile -_id')
     
  
        await cloudinary.uploader.destroy(getPublicIdProfile.publicIdProfile)
    
    await  Enregistrer.findOneAndUpdate({_id:req.decoded.userId},{
        $set:{
          profileImage:req?.file?.path,
          publicIdProfile:req?.file?.filename
        }
      })
  
      res.json({message:'La photo du profile a ete ajouter'})
      
    } catch (error) {
      console.log(error);
      res.json({ message: `Server error in singleUserInfo > ${err.message}` })
    }
  
  }
 

let completeRegistration=async(req,res)=>{
  // console.log('body > ',req.body)
 

try {

  await  Enregistrer.findOneAndUpdate({_id:req.decoded.userId},{
  $set:{  

  prenom:req.body.editPrenom,
  nom:req.body.editNom,
  dateNaissance:req.body.editDateNaissance,
  phoneNumber:req.body.editPhoneNumber,
  sex:req.body.editSex,
  isCompleted:true

  }
  })
  
  res.json({message:` L'enrigistration est complet `})
  
} catch (error) {
  res.json({ message: `Server error in completeRegistration > ${err.message}` })
}

  
}




module.exports= {enregistrer,connecter,getConfirmation,getAllUsers,booking,getBooking
  ,getMyReservation,userProfile,addImageProfile,completeRegistration}