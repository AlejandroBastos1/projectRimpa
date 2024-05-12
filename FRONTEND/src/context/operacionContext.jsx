import { createContext, useContext, useState } from "react";
import {
  createOperacionRequest,
  getOperacionesRequest,
} from "../api/operacion.js";
import { useEffect } from "react";

const OperacionContext = createContext();

export const useOperacion = () => {
  const context = useContext(OperacionContext);

  if (!context) {
    throw new Error("useOperacion must be used within a OperacionProvider");
  }

  return context;
};

export function OperacionProvider({ children }) {
  const [operaciones, setTOperaciones] = useState([]);
  const [errors, setErrors] = useState([]);

  const getOperaciones = async () => {
    try {
      const res = await getOperacionesRequest();
      setTOperaciones(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createOperacion = async (operacion) => {
    try {
      const res = await createOperacionRequest(operacion);
      console.log(res);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <OperacionContext.Provider
      value={{
        operaciones,
        createOperacion,
        getOperaciones,
        errors,
      }}
    >
      {children}
    </OperacionContext.Provider>
  );
}
