import React from "react";

import iconManualUsuario from "../images/manual.png";
import iconContactenos from "../images/contact.png";
import iconReportarError from "../images/error.png";

export default function AsistenciaPage() {
  return (
    <div className="contenedorAsistencia">
      <h2 className="tituloAsistencia">¿NECESITA AYUDA?</h2>

      <div className="contenedorModulosAsistencia">
        <div className="tarjetasAsistencia">
          <img className="imgModulo" src={iconManualUsuario} />
          <div className="contenedorDescripcionTarjetas">
            <div className="contenedorSubtituloTarjetas">
              <h3 className="subtituloAsistencia">MANUAL DE USUARIO</h3>
            </div>
            <p className="parrafoAsistencia">
              Encuentre el manual de usuario de guia para el uso de la
              aplicacion dando click&nbsp;
              <a className="anclaAsistencia" href="#">
                aqui.
              </a>
            </p>
          </div>
        </div>

        <div className="tarjetasAsistencia">
          <img className="imgModulo" src={iconContactenos} />
          <div className="contenedorDescripcionTarjetas">
            <div className="contenedorSubtituloTarjetas">
              <h3 className="subtituloAsistencia">CONTACTENOS</h3>
            </div>
            <p className="parrafoAsistencia">
              Contactenos para resolver inquitudes urgentes&nbsp;
              <a className="anclaAsistencia" href="tel:+123456789">
                aqui.
              </a>
            </p>
          </div>
        </div>

        <div className="tarjetasAsistencia">
          <img className="imgModulo" src={iconReportarError} />
          <div className="contenedorDescripcionTarjetas">
            <div className="contenedorSubtituloTarjetas">
              <h3 className="subtituloAsistencia">REPORTAR UN ERROR</h3>
            </div>
            <p className="parrafoAsistencia">
              Para reportar un error encontrado de click&nbsp;
              <a className="anclaAsistencia" href="mailto:lejobass02@gmail.com">
                aqui
              </a>{" "}
              para enviar un mensaje a nuestro correo electronico.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
