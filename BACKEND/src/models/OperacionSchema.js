import { Schema, SchemaTypes, model } from "mongoose";

const material = new Schema({
  material: {type: SchemaTypes.ObjectId,
  ref: "Material"},
  piezasMaterial: String,
  pesoMaterial: String,
});

const operacionSchema = new Schema(
  {
    autor: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },

    infoAvion: {
      type: SchemaTypes.ObjectId,
      ref: "Plane",
    },

    infoPiloto: {
      type: SchemaTypes.ObjectId,
      ref: "cabin_member",
    },

    infoCopiloto: {
      type: SchemaTypes.ObjectId,
      ref: "cabin_member",
    },

    tripulacion: {
      type: SchemaTypes.ObjectId,
      ref: "Platoon",
    },

    ciudadSalida: {
      type: SchemaTypes.ObjectId,
      ref: "MilitarUnit",
    },

    ciudadAterrizaje: {
      type: SchemaTypes.ObjectId,
      ref: "MilitarUnit",
    },

    fechaSalida: {
      type: Date,
    },

    horaSalida: {
      type: String,
    },

    materialAbordo: [material]
  },

  {
    timestamps: true,
  }
);

export default model("Operation", operacionSchema);
