import { Schema, model } from 'mongoose';

const unidadesMilitaresSchema = new Schema ({

    nombre: {
        type : String,
        unique: true,
        required: true
    },

    municipio: {
        type : String,
        required : true,
    },

    departamento: {
        type : String,
        required : true,
        unique: true
    },

    comandante: {
        type: String,
        required : true,
        unique: true
    }

});

export default model('MilitarUnit', unidadesMilitaresSchema);

