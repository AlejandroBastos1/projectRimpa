import {
  avionRequest,
  ciudadRequest,
  tripulacionRequest,
  pilotoRequest,
  materialRequest,
} from "./dataGenerarOperacion";

export async function showOptionsAvion() {
  try {
    const response = await avionRequest();
    return response.data;
  } catch (error) {
    console.error("Error al recuperar datos de MongoDB:", error);
    return [];
  }
}

export async function showOptionsCiudad() {
  try {
    const response = await ciudadRequest();
    return response.data;
  } catch (error) {
    console.error("Error al recuperar datos de MongoDB:", error);
    return []; 
  }
}

export async function showOptionsTripulacion() {
  try {
    const response = await tripulacionRequest();
    return response.data;
  } catch (error) {
    console.error("Error al recuperar datos de MongoDB:", error);
    return []; 
  }
}

export async function showOptionsTripulacionCabina(){
    try {
        const response = await pilotoRequest();
        return response.data;
    } catch (error) {
        console.error("Error al recuperar datos de MongoDB:", error);
        return [];
    }
}

export async function showOptionsMaterial(){
  try {
    const response = await materialRequest();
    return response.data;
  } catch (error) {
    console.log("Error al recuperar datos de MongoDB", error);
    return [];
  }
}