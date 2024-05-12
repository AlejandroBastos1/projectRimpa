import { Schema, SchemaTypes, model } from "mongoose";

const peloton = new Schema ({
    nombre: {
        type: String,
        unique: true,
        required : true
    },

    miembros : { 
        type : [{
            type : SchemaTypes.ObjectId,
            ref : 'MembersPlatoon',
            unique : true
        }],
        
        unique: true,
    }
});

export default model('Platoon', peloton)