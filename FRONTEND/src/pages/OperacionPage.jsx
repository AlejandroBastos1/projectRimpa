import React from "react";

export default function OperacionPage() {
  return (
    <div className="contenedorOperacion">
        <div className="tituloOperacion">
          <h2>SELECCIONE EL MODULO</h2>
        </div>

        <div className="contenedorDobleModulo">
          <a className="botonDobleModulo" href="/consultas">
            CONSULTAR OPERACION
          </a>

          <a className="botonDobleModulo" href="/generar">
            CREAR OPERACION
          </a>
        </div>
    </div>
  );
}
