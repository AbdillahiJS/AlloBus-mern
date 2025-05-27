const mongoose = require('mongoose') 
const { Schema } = mongoose

const bookingSchema= new Schema({
    datePrise:{
        type:Date
    },

    dateRetour:{
        type:Date
    },

   totalPrix:{
    type:Number,
    default:0
   },

   daysRemaining:{
    type:Number,
    default:1
   },
completed:{
      type:Boolean,
      default:false
   },
   rendu:{
    type:Boolean,
    default:false
   },

    reservateurId:{type: Schema.Types.ObjectId, ref: 'Enregistrer'},

    voitureId:{type: Schema.Types.ObjectId, ref: 'VoitureLocation'}

},{timestamps:true})


module.exports =mongoose.model('Booking',bookingSchema)