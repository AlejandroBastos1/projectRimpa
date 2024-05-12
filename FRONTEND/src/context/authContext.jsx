import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  updateUserDataRequest,
  verifyTokenRequest
} from "../api/auth.js";
import Cookies from "js-cookie";

export const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UseAuth debe estar dentro de un Provider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signUp = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
    }
  };

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res.data);
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        console.log("ocurrio un error con la autenticacion");
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
      console.log("ocurrio un error con la autenticacion");
    }
  };

  const updateUser = async (userDataId, data) => {
    try {
      const res = await updateUserDataRequest(userDataId, data);
      console.log(data)
      console.log("Datos actualizados:", res.data);
      setUser(res.data);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };


  const logOut = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signUp, signIn, user, isAuthenticated, errors, loading, logOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
