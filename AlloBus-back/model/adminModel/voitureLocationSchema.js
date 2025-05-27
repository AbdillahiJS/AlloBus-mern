const mongoose = require('mongoose') 
const { Schema } = mongoose

const voitureLocationSchema= new Schema({

 busImage:[],

genre:    {
            type:String,
            enum:['bus','minibus'],
            required: true
          },

titre:    {
             type:String,
             required: true
          },

passagers:{
           type:Number,
           required: true
         },

climatisseur:{
            type:String,
            enum:['oui','non'],
            required: true
            },

boiteVitesse:{
    type:String,
    enum:['Manuel','Auto'],
    required: true
},
prix:{
  type:Number
}


},{timestamps:true})

module.exports =mongoose.model('VoitureLocation',voitureLocationSchema)