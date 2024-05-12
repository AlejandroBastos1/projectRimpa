import React, { useState } from "react";
import { useEffect } from "react";
import { operacionesRequest } from "../api/dataGenerarOperacion";
import { deleteOperacionRequest } from "../api/operacion";
import Modal from "../components/Modal";
import { useAuth } from "../context/authContext";
import IsLoading from "../components/IsLoading";

export default function OperacionConsultaPage() {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [infoOperacion, setInfoOperacion] = useState([]);

  const [avionMatricula, setAvionMatricula] = useState();
  const [avionCapacidad, setAvionCapacidad] = useState();
  const [tipoAvion, setTipoAvion] = useState();
  const [piloto, setPiloto] = useState({});
  const [copiloto, setCopiloto] = useState({});
  const [ciudades, setCiudades] = useState([]);
  const [horaSalida, setHoraSalida] = useState();
  const [showModal, setShowModal] = useState(false);
  const [integrantesTripulacion, setIntegrantesTripulacion] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [userOperacion, setUserOperacion] = useState(false);
  const [operacionId, setOperacionId] = useState("");

  useEffect(() => {
    async function fetchDataOperacion() {
      const data = await operacionesRequest();
      setInfoOperacion(data.data);
    }
    fetchDataOperacion();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Verificar si hay datos en infoOperacion antes de acceder a infoAvion

  useEffect(() => {
    async function fetchUser() {
      const { data } = await operacionesRequest();
      console.log(data);
      if (data && data.length > 0) {
        setOperacionId(data[0]._id);
        console.log(operacionId);
      }

      if (data.length === 0) {
        console.log("esta vacio");
        return;
      }

      data.map((operacion) => {
        if (user.id === operacion.autor) {
          return setUserOperacion(true);
        } else {
          console.log("no hay");
        }
      });
    }

    if (!user) {
      return;
    }

    fetchUser();
  }, [user]);

  console.log(userOperacion);

  useEffect(() => {
    if (infoOperacion.length > 0) {
      console.log(infoOperacion);
      setAvionMatricula(infoOperacion[0].infoAvion.matricula);
      setAvionCapacidad(infoOperacion[0].infoAvion.capacidadCarga);
      setTipoAvion(infoOperacion[0].infoAvion.tipoAvion);
      setPiloto({
        nombre: infoOperacion[0].infoPiloto.nombre,
        libretaM: infoOperacion[0].infoPiloto.libretaM,
      });
      setCopiloto({
        nombre: infoOperacion[0].infoCopiloto.nombre,
        libretaM: infoOperacion[0].infoCopiloto.libretaM,
      });
      setCiudades([
        { ciudadSalida: infoOperacion[0].ciudadSalida.municipio },
        { ciudadAterrizaje: infoOperacion[0].ciudadAterrizaje.municipio },
      ]);

      setHoraSalida(infoOperacion[0].horaSalida);
      setIntegrantesTripulacion([
        {
          nombre: infoOperacion[0].tripulacion.miembros[0].nombre,
          libretaM: infoOperacion[0].tripulacion.miembros[0].libretaM,
        },
        {
          nombre: infoOperacion[0].tripulacion.miembros[1].nombre,
          libretaM: infoOperacion[0].tripulacion.miembros[0].libretaM,
        },
        {
          nombre: infoOperacion[0].tripulacion.miembros[2].nombre,
          libretaM: infoOperacion[0].tripulacion.miembros[0].libretaM,
        },
        {
          nombre: infoOperacion[0].tripulacion.miembros[3].nombre,
          libretaM: infoOperacion[0].tripulacion.miembros[0].libretaM,
        },
        {
          nombre: infoOperacion[0].tripulacion.miembros[4].nombre,
          libretaM: infoOperacion[0].tripulacion.miembros[0].libretaM,
        },
      ]);

      setMateriales(infoOperacion[0].materialAbordo);
      console.log(materiales);
    }
  }, [infoOperacion]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  const finalizarOperacion = () => {
    console.log(operacionId);
    deleteOperacionRequest(operacionId);
    console.log("operacion eliminada exitosamente");
    window.location.reload();
  };

  return (
    <div className="contenedorConsultarOperacion">
      {isLoading ? (
        <IsLoading />
      ) : (
        <>
          {!userOperacion ? (
            <div className="contenedorOperacionInexistente">
              <h3>
                USTED NO TIENE NINGUNA OPERACION CREADA. DIRIJASE A GENERAR
                OPERACION <a href="/generar">AQUI</a>
              </h3>
            </div>
          ) : (
            <div className="contenedorConsulta">
              <div className="contenedorInfoDespegue">
                <div className="contenedorLugarTiempo">
                  <h4>SALIDA</h4>
                  <p>{ciudades.length > 0 && ciudades[0].ciudadSalida}</p>
                </div>
                <div className="contenedorLugarTiempo">
                  <h4>HORA SALIDA</h4>
                  <p>{horaSalida}</p>
                </div>
                <div className="contenedorLugarTiempo">
                  <h4>LLEGADA</h4>
                  <p>{ciudades.length > 0 && ciudades[1].ciudadAterrizaje}</p>
                </div>
              </div>
              <div className="contenedorInformacionGeneral">
                <div className="informacionVuelo">
                  <ul>
                    <h3>Informacion de la Aeronave</h3>
                    <li>Matricula: {avionMatricula}</li>
                    <li>Tipo de Avion: {tipoAvion}</li>
                    <li>Capacidad material a bordo: {avionCapacidad}</li>
                  </ul>
                  <ul>
                    <h3>Informacion Tripulacion</h3>
                    <li>Piloto: {piloto.nombre}</li>
                    <li>Libreta Militar: {piloto.libretaM} </li>
                  </ul>
                  <ul>
                    <li>Copiloto: {copiloto.nombre}</li>
                    <li>Libreta Militar: {copiloto.libretaM}</li>
                  </ul>
                  <ul>
                    <button onClick={toggleModal}>
                      Informacion de pasajeros
                    </button>
                  </ul>
                  <Modal show={showModal} onClose={toggleModal}>
                    <button className="botonCerrarModal" onClick={toggleModal}>
                      X
                    </button>

                    <div className="contenedorModalInforTrip">
                      <h3>INFORMACION TRIPULACION</h3>
                      <ul>
                        {integrantesTripulacion.map((tripulante, index) =>
                          tripulante ? (
                            <div className="contenedorDatosTrip">
                              <h3>{tripulante.nombre}</h3>
                              <li key={index}>
                                Libreta Militar: {tripulante.libretaM}
                              </li>
                            </div>
                          ) : null
                        )}
                      </ul>
                    </div>
                  </Modal>
                </div>
                <div className="informacionCarga">
                  <div className="tituloInformacionCarga">
                    <h4>MATERIAL A BORDO</h4>
                  </div>
                  <div className="contenedorMaterialesAbordo">
                    {materiales.map((material, index) => (
                      <div className="contenedorMaterialConsulta">
                        <li className="contenedorMateriales" key={index}>
                          <h3>{material.material.nombre}</h3>
                          <p>Codigo ONU: {material.material.onuId}</p>
                          <p>Clase: {material.material.clase}</p>
                          <p>Peso total: {material.pesoMaterial} kg</p>
                          <p>Cantidad: {material.piezasMaterial} und </p>
                        </li>
                      </div>
                    ))}
                  </div>
                  <button
                    className="botonFinalizarOperacion"
                    onClick={finalizarOperacion}
                  >
                    <span>&#9888;</span> Finalizar Operacion{" "}
                    <span>&#9888;</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
