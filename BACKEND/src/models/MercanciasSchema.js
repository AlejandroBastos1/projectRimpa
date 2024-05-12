import {Schema, model} from 'mongoose';

const mercanciaSchema = new Schema({
    nombre: {
        type: String,
        unique : true,
        trim : true,
        required : true
    },

    onuId : { 
        type: String,
        unique : true,
        maxLength : 4,
        required: true,
    },
    
    clase : {
        type: String,
        trim : true,
        required: true,
    }
});

export default model('Material', mercanciaSchema);

