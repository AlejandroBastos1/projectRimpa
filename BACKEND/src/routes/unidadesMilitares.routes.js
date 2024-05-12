import { Router } from "express";
import { newUnidadMilitar,
    putUnidadMilitar, 
    deleteUnidadMilitar, 
    getUnidadMilitar 
} from '../controllers/unidades.controller.js'

const routerUnidadesM = Router();

routerUnidadesM.post('/api/unidadesMilitares', newUnidadMilitar );

routerUnidadesM.get('/api/unidadesMilitares', getUnidadMilitar);

routerUnidadesM.delete('/api/unidadesMilitares', deleteUnidadMilitar);

routerUnidadesM.put('/api/unidadesMilitares', putUnidadMilitar);

export default routerUnidadesM;

