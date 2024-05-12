import { Router } from "express";
import {authRequired} from "../middleware/validateToken.js"

import {
  getOperations,
  getOperation,
  createOperation,
  deleteOperation,
  putOperation
} from "../controllers/operacion.controller.js";

import {validateSchema} from '../middleware/validator.middleware.js'
import {OperacionValidatorSchema} from "../schemas/operacion.validatorSchema.js"

const routerOperaciones = Router();

routerOperaciones.get("/api/operaciones", authRequired, getOperations)
routerOperaciones.get("/api/operaciones/validacion", authRequired, getOperation)
routerOperaciones.post("/api/operaciones", authRequired,validateSchema(OperacionValidatorSchema), createOperation)
routerOperaciones.delete("/api/operaciones/:id", authRequired, deleteOperation)
routerOperaciones.put("/api/operaciones:/id", authRequired, putOperation)
export default routerOperaciones;
