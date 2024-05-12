import { Router } from "express";
import { newMaterial,
        getMaterial,
        putMaterial,
        deleteMaterial
    } from "../controllers/material.controller.js";

const routerMateriales = Router();

routerMateriales.post ('/api/materiales', newMaterial)

routerMateriales.get ('/api/materiales', getMaterial)

routerMateriales.delete ('/api/materiales', deleteMaterial)

routerMateriales.put ('/api/materiales', putMaterial)

export default routerMateriales;