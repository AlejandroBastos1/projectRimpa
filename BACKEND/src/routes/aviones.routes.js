import { Router } from "express";

import { newAvion,
    putAvion, 
    deleteAvion,
    getAvion}
from '../controllers/aviones.controllers.js'

const routerAviones = Router();

routerAviones.post('/api/aviones', newAvion);

routerAviones.get('/api/aviones', getAvion);

routerAviones.delete('/api/aviones', deleteAvion);

routerAviones.put('/api/aviones', putAvion);

export default routerAviones;