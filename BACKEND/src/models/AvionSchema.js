import { Schema, model } from "mongoose";

const infoAvionSchema = new Schema ({

    matricula : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },

    tipoAvion: {
        type : String,
        required : true,
        trim: true
    },

    capacidadCarga : {
        type : Number,
        required : true,
        trim: true,
    }
});

export default model('Plane', infoAvionSchema);

