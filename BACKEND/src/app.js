import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import routerIntegrantesP from "./routes/integrantesPeloton.routes.js";
import routerPelotones from "./routes/pelotones.routes.js";
import routerAviones from "./routes/aviones.routes.js";
import routerUnidadesM from "./routes/unidadesMilitares.routes.js";
import routerIntegrantesC from "./routes/integrantesCabina.routes.js";
import routerMateriales from "./routes/material.routes.js";
import routerAuth from "./routes/auth.routes.js";

import cors from 'cors';
import routerOperaciones from "./routes/operacion.routes.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();



app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const __filename = fileURLToPath(import.meta.url);
// Obtiene el directorio del archivo actual
const __dirname = dirname(__filename);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use('/public', express.static(`${__dirname}/imgs`));

app.use(
  routerIntegrantesP,
  routerPelotones,
  routerOperaciones,
  routerAviones,
  routerUnidadesM,
  routerIntegrantesC,
  routerMateriales,
  routerAuth
);

export default app;
