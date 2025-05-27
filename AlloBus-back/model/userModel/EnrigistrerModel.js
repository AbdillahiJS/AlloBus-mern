const mongoose = require('mongoose') 
const { Schema } = mongoose

const enregistrerSchema= new Schema({

prenom:{
        type:String,
        },

nom:{
    type:String,
    },

email:{
           type:String,
           unique:true
    },
password:{
           type:String,
           
      },

isActive: {

    type:Boolean,
    default:false
},



 },{timestamps:true})


 module.exports =mongoose.model('Enregistrer',enregistrerSchema)

