import {Router} from 'express'

import {newIntegrantesPeloton, 
    getIntegrantesPeloton, 
    putIntegrantesPeloton, 
    deleteIntegrantesPeloton} 
from '../controllers/integrantesPelotones.controller.js'


const routerIntegrantesP = Router();

routerIntegrantesP.post ('/api/integrantesPeloton', newIntegrantesPeloton);

routerIntegrantesP.get('/api/integrantesPeloton', getIntegrantesPeloton)

routerIntegrantesP.delete('/api/integrantesPeloton', deleteIntegrantesPeloton)

routerIntegrantesP.put('/api/integrantesPeloton', putIntegrantesPeloton)

export default routerIntegrantesP;