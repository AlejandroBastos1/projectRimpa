import {Router} from 'express'
import { newPeloton, 
    deletePeloton, 
    putPeloton, 
    getPeloton} 
from '../controllers/pelotones.controller.js';

const routerPelotones = Router();

routerPelotones.post ('/api/pelotones', newPeloton );

routerPelotones.get('/api/pelotones', getPeloton);

routerPelotones.delete('/api/pelotones', deletePeloton );

routerPelotones.put('/api/pelotones', putPeloton );

export default routerPelotones;