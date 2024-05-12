import { Schema, model, SchemaTypes } from "mongoose";

const integrantesPeloton = new Schema ({
   
    nombre : {
        type: String,
        trim : true,
        required : true
    }, 

    cedula : {
        type : Number,
        required : true,
        trim : true,
        unique: true,
        minlenght : 10
    },

    libretaM : {
        type : String,
        required : true,
        trim : true,
        minlenght:10,
        unique: true
    },

    peloton : { 
        type : SchemaTypes.ObjectId,
        trim : true,
        unique : false,
        default : 'indefinido',
        ref: 'Platoon'
    }

});

export default model('MembersPlatoon', integrantesPeloton)