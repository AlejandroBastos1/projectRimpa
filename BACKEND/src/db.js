import mongoose from "mongoose";
import { mongoDir } from "./config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoDir);
        console.log('Base de Datos conectada...')
    } catch (error) {
        console.log(error)
    }
}

