import instancia from "./axios";

export const getOperacionRequest = (id) => instancia.get(`/operaciones/${id}`);

export const getOperacionesRequest = () => instancia.get("/operaciones");

export const createOperacionRequest = (operacion) =>
  instancia.post("/operaciones", operacion);

export const deleteOperacionRequest = (id) => instancia.delete(`/operaciones/${id}`);
