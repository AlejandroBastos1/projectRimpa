import React from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, isAuthenticated, errors: authErrors } = useAuth();
  const navigation = useNavigate();

  const onSubmitLogin = handleSubmit(async (data) => {
    console.log(data);
    signIn(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigation("/operacion");
    }
  }, [isAuthenticated]);
  return (
    <div className="contenedorLogin">
      <div className="contenedorTituloLogin">
        <h1>LOGIN</h1>
      </div>

      <div className="contenedorFormularioLogin">
        {authErrors.map((error, i) => (
          <div className="errorFormularioLogin" key={i}>
            ** {error} **
          </div>
        ))}

        <form className="formularioLogin" onSubmit={onSubmitLogin}>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
          />

          {errors.email && (
            <div className="contenedorCampoObligatorio">
              <p className="campoObligatorio">* Campo obligatorio *</p>
            </div>
          )}

          <input
            type="password"
            {...register("contraseña", { required: true })}
            placeholder="Contraseña"
          />

          {errors.contraseña && (
            <div className="contenedorCampoObligatorio">
              <p className="campoObligatorio">* Campo obligatorio *</p>
            </div>
          )}

          <button type="submit">INGRESAR</button>
        </form>
      </div>
      <div className="contenedorTienesUnaCuenta">
          <p className="noTienesCuenta">¿No tienes una cuenta?</p>
          <Link className="registrate" to="/register">
            ¡Registrate Aqui!
          </Link>
        </div>
    </div>
  );
}
