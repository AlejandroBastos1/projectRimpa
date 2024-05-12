import { Schema, model } from "mongoose";
import {host, port} from "../config.js";
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    libretaMilitar: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    contraseña: {
      type: String,
      required: true,
      trim: true,
    },

    celular: Number,

    domicilio: String,

    fechaNacimiento: String,

    cedula: Number,

    fotoUsuario: String,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.SetFotoUsuario = function SetFotoUsuario(filename) {
  this.fotoUsuario = `${host}:${port}/public/${filename}`;
};

export default model("User", userSchema);
