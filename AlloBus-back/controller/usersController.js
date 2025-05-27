// const Mongoose =require('mongoose')
const Enregistrer =require('../model/userModel/EnrigistrerModel.js')
const bcrypt =require('bcryptjs')
const jwt =require('jsonwebtoken')
const nodemailer = require('nodemailer');
const emailTemplate=require('../emailTemplate.js')
const Booking =require('../model/userModel/bookingModel')

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

     console.log('Email de confirmation envoyé à', email);

  }catch(err){

     console.log('SendEmailError >',err);
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
      } catch (err) {
        console.log(`Server error in Registration ${err}`)
         res.json({ message: `Server error in Registration ${err.message}` });
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
    } catch (err) {
     return res.json({ message: `Server error in connexion > ${err.message}` });
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
    res.json({ message: `Server error in getConfirmation > ${err.message}` })
  }

  }

  const getAllUsers=async(req,res)=>{

    try {
      let getAllUsers = await Enregistrer.find()

      res.json({getAllUsers})
      
    } catch (error) {
      res.json({ message: `Server error in getAllUsers > ${err.message}` })
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

    //  console.log(reservez);
      await reservez.save()
      res.json({message:'felicitation de Reservez'})
      
    } catch (error) {
      console.log(error);
      res.json({ message: `Server error in booking > ${err.message}` })
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
  





  const getBooking=async(req,res)=>{
    console.log('booking-ID >',req.params.bookingId)

    try {
     let getAllBooking=await Booking.findOne({reservateurId:req.decoded.userId,voitureId:req.params.bookingId})

    //  console.log('getBooking >',getAllBooking)
    let countD=countDown(getAllBooking?.datePrise,getAllBooking?.dateRetour)

    if(countD?.days === 0){

      await Booking.findOneAndUpdate({reservateurId:req.decoded.userId,_id:getAllBooking?._id,completed:false},{
        $set:{
          completed:true
        }
      })
    }
    req.io.emit('booking-ID','for completion');

      res.json({getAllBooking,countD})
      
    } catch (error) {
      console.log(error);
      res.json({ message: `Server error in getBooking > ${err.message}` })
    }

  }



  const getMyReservation=async(req,res)=>{
    console.log('Mon reservation ID >',req.decoded)

    try {

     let getAllMyReservation=await Booking.find({reservateurId:req.decoded.userId}).populate('reservateurId voitureId').sort({createdAt:-1})

     req.io.emit('myReservation','All the reservation');

      res.json({getAllMyReservation})
      
    } catch (error) {

      console.log(error);
      res.json({ message: `Server error in getMyReservation > ${err.message}` })
      
    }

  }

 


module.exports= {enregistrer,connecter,getConfirmation,getAllUsers,booking,getBooking,getMyReservation}