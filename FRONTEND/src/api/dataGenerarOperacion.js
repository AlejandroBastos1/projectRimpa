import instancia from "./axios";

export const ciudadRequest = () => instancia.get("/unidadesMilitares");
export const avionRequest = () => instancia.get("/aviones");
export const tripulacionRequest = () => instancia.get("/pelotones")
export const pilotoRequest = () => instancia.get("/integrantesCabinaP")
export const copilotoRequest = () => instancia.get("/integrantesCabinaC")
export const materialRequest = () => instancia.get("/materiales")
export const operacionesRequest = () => instancia.get("/operaciones")
export const operacionRequest = () => instancia.get("/operaciones/validacion")