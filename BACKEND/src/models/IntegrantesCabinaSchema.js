import {Schema, model} from 'mongoose';

const integrantesCabina = new Schema ({
    nombre : { 
        type : String,
        required : true,
        trim : true
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

    esPiloto : {
        type: Boolean,
        required : true,
        default : false
    }
});

export default model('cabin_member', integrantesCabina);

