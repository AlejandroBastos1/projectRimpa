import { Router } from "express";
import {
  newIntegrantesCabina,
  deleteIntegrantesCabina,
  putIntegrantesCabina,
  getIntegrantesCabinaPilotos,
  getIntegrantesCabinaCopilotos
} from "../controllers/integrantesCabina.controller.js";

const routerIntegrantesC = Router();

routerIntegrantesC.post("/api/integrantesCabina", newIntegrantesCabina);

routerIntegrantesC.get("/api/integrantesCabinaP", getIntegrantesCabinaPilotos);

routerIntegrantesC.get("/api/integrantesCabinaC", getIntegrantesCabinaCopilotos);

routerIntegrantesC.delete("/api/integrantesCabina", deleteIntegrantesCabina);

routerIntegrantesC.put("/api/integrantesCabina", putIntegrantesCabina);

export default routerIntegrantesC;
