import React, { useState, useEffect } from "react";
import InsertarMaterial from "../components/InsertarMaterial.jsx";
import {
  avionRequest,
  pilotoRequest,
  copilotoRequest,
  tripulacionRequest,
  ciudadRequest,
  operacionRequest,
} from "../api/dataGenerarOperacion.js";
import { useForm, FormProvider } from "react-hook-form";
import { useOperacion } from "../context/operacionContext.jsx";
import { useAuth } from "../context/authContext.jsx";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import IsLoading from "../components/IsLoading";

export default function GenerarOperacionPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { createOperacion, errors: operacionErrors } = useOperacion();

  const [isLoading, setIsLoading] = useState(true);
  const [materiales, setMateriales] = useState([]);
  const [showOptionsAvion, setOptionsAvion] = useState([]);
  const [tipoAvionSeleccionado, setTipoAvionSeleccionado] = useState("");
  const [CapacidadAvion, setCapacidadAvion] = useState("");
  const [showOptionsPiloto, setOptionsPiloto] = useState([]);
  const [nombrePiloto, setNombrePiloto] = useState("");
  const [showOptionsCopiloto, setOptionsCopiloto] = useState([]);
  const [nombreCopiloto, setNombreCopiloto] = useState("");
  const [showOptionsTrip, setOptionsTrip] = useState([]);
  const [showOptionsCiudadSalida, setOptionsCiudadSalida] = useState([]);
  const [showOptionsCiudadAterrizaje, setOptionsCiudadAterrizaje] = useState(
    []
  );
  const [userOperacion, setUserOperacion] = useState(false);
  const [contadorMateriales, setContadorMateriales] = useState();

  const { user } = useAuth();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    console.log(operacionErrors);

    if (operacionErrors && !data.materialAbordo) {
      return toast.warning("rellene todos los campos");
    } else if (data) {
      createOperacion(data);
      window.location.reload();
    }

  });

  useEffect(() => {
    async function fetchUser() {
      const { data } = await operacionRequest();

      if (data.length === 0) {
        console.log("esta vacio");
        return;
      }

      data.map((operacion) => {
        if (user.id === operacion.autor) {
          console.log("yesss");
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

  //logica materiales

  const agregarMaterial = () => {
    const nuevoMaterial = {
      material: "",
      piezasMaterial: 0,
      pesoMaterial: 0,
    };

    const nuevosMateriales = [...materiales, nuevoMaterial];
    setMateriales(nuevosMateriales);
    setValue("materialAbordo", nuevosMateriales);
    setContadorMateriales(nuevosMateriales.length);
  };

  const handleDeleteMaterial = (index) => {
    const nuevosMateriales = [...materiales];
    nuevosMateriales.splice(index, 1);
    setMateriales(nuevosMateriales);
    setValue("materialAbordo", nuevosMateriales);
    setContadorMateriales(nuevosMateriales.length);
  };

  useEffect(() => {
    async function fetchDataAvion() {
      const data = await avionRequest();
      setOptionsAvion(data.data);
    }
    fetchDataAvion();
  }, []);

  const handleMatriculaChange = (event) => {
    const selectedMatricula = event.target.value;
    const avionSeleccionado = showOptionsAvion.find(
      (showOptionsAvion) => showOptionsAvion.matricula === selectedMatricula
    );
    if (avionSeleccionado) {
      setValue("infoAvion", avionSeleccionado._id);
      setTipoAvionSeleccionado(avionSeleccionado.tipoAvion);
      setCapacidadAvion(avionSeleccionado.capacidadCarga);
    } else {
      setTipoAvionSeleccionado("");
      setCapacidadAvion("");
      console.log(tipoAvionSeleccionado + CapacidadAvion);
    }
  };

  // Logica de Piloto

  useEffect(() => {
    async function fetchDataPiloto() {
      const data = await pilotoRequest();
      setOptionsPiloto(data.data);
    }
    fetchDataPiloto();
  }, []);

  const handlelibretaMpilotoChange = (event) => {
    const selectedLibretaM = event.target.value;
    const pilotoSeleccionado = showOptionsPiloto.find(
      (showOptionsPiloto) => showOptionsPiloto.libretaM === selectedLibretaM
    );
    if (pilotoSeleccionado) {
      setValue("infoPiloto", pilotoSeleccionado._id);
      setNombrePiloto(pilotoSeleccionado.nombre);
    } else {
      setNombrePiloto("");
    }
  };

  // Logica de coPiloto

  useEffect(() => {
    async function fetchDataCopiloto() {
      const data = await copilotoRequest();
      setOptionsCopiloto(data.data);
    }
    fetchDataCopiloto();
  }, []);

  const handlelibretaMCopilotoChange = (event) => {
    const selectedLibretaM = event.target.value;
    const copilotoSeleccionado = showOptionsCopiloto.find(
      (showOptionsCopiloto) => showOptionsCopiloto.libretaM === selectedLibretaM
    );
    if (copilotoSeleccionado) {
      setValue("infoCopiloto", copilotoSeleccionado._id);
      setNombreCopiloto(copilotoSeleccionado.nombre);
    } else {
      setNombreCopiloto("");
    }
  };

  //logica tripulacion

  useEffect(() => {
    async function fetchDataTrip() {
      const data = await tripulacionRequest();
      setOptionsTrip(data.data);
    }
    fetchDataTrip();
  }, []);

  const handleTripChange = (event) => {
    const selectedTrip = event.target.value;
    const tripulacionSeleccionada = showOptionsTrip.find(
      (showOptionsTrip) => showOptionsTrip.nombre === selectedTrip
    );

    if (tripulacionSeleccionada) {
      setValue("tripulacion", tripulacionSeleccionada._id);
    }
  };

  //logica ciudad

  useEffect(() => {
    async function fetchDataCiudad() {
      const data = await ciudadRequest();
      setOptionsCiudadSalida(data.data);
      setOptionsCiudadAterrizaje(data.data);
    }
    fetchDataCiudad();
  }, []);

  const handleCiudadSalida = (event) => {
    const selectedCiudadSalida = event.target.value;
    const ciudadSeleccionada = showOptionsCiudadSalida.find(
      (showOptionsCiudadSalida) =>
        showOptionsCiudadSalida.municipio === selectedCiudadSalida
    );

    if (ciudadSeleccionada) {
      setValue("ciudadSalida", ciudadSeleccionada._id);
    }
  };

  const handleCiudadAterrizaje = (event) => {
    const selectedCiudadAterrizaje = event.target.value;
    const ciudadSeleccionada = showOptionsCiudadAterrizaje.find(
      (showOptionsCiudadAterrizaje) =>
        showOptionsCiudadAterrizaje.municipio === selectedCiudadAterrizaje
    );

    if (ciudadSeleccionada) {
      setValue("ciudadAterrizaje", ciudadSeleccionada._id);
    }
  };

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <div>
      {isLoading ? (
        <IsLoading />
      ) : (
        <div className="contenedorGenerarOperacion">
          {userOperacion ? (
            <div className="contenedorOperacionExistente">
              <h3>
                USTED TIENE UNA OPERACION CREADA POR FAVOR CONSULTE O ELIMINE LA
                YA EXISTENTE CON ESTE <a href="/consultas">LINK</a>
              </h3>
            </div>
          ) : (
            <>
              <FormProvider {...useForm}>
                <div className="tituloGenerarOperacion">
                  <h2>CREACION DE OPERACION</h2>
                </div>
                <button
                    type="submit"
                    className="botonEnviar"
                    form="formulario1"
                  >
                    Enviar
                  </button>
                <form id="formulario1" onSubmit={onSubmit}>
                  <div className="contenedorAggInfoMate">
                    <div className="contenedorInfo">
                      <div className="contenedorAvion">
                        <div className="contenedorMatricula">
                          <label
                            className="textoPageOperacion"
                            htmlFor="matricula"
                          >
                            Elija matricula:
                          </label>
                          <select
                            id="matricula"
                            name="matricula"
                            onChange={handleMatriculaChange}
                          >
                            <option>Seleccione...</option>
                            {showOptionsAvion.map((avion) => (
                              <option
                                key={avion.matricula}
                                value={avion.matricula}
                              >
                                {avion.matricula}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="contenedorEspecificacionesAvion">
                          <h3>Tipo de avion:</h3>
                          <p> {tipoAvionSeleccionado}</p>
                        </div>

                        <div className="contenedorEspecificacionesAvion">
                          <h3>Capacidad:</h3>
                          <p>{CapacidadAvion}</p>
                        </div>
                      </div>

                      <div className="contenedorTripulacion1">
                        <div className="contenedorTripCabina">
                          <label
                            className="textoPageOperacion"
                            htmlFor="piloto"
                          >
                            Lib. militar del piloto:{" "}
                          </label>
                          <select
                            id="piloto"
                            onChange={handlelibretaMpilotoChange}
                          >
                            <option>Seleccione...</option>
                            {showOptionsPiloto.map((piloto) => (
                              <option
                                key={piloto.libretaM}
                                value={piloto.libretaM}
                              >
                                {piloto.libretaM}
                              </option>
                            ))}
                          </select>
                          <p>{nombrePiloto}</p>
                        </div>

                        <div className="contenedorTripCabina">
                          <label
                            className="textoPageOperacion"
                            htmlFor="copiloto"
                          >
                            Lib. militar del copiloto:
                          </label>
                          <select
                            id="copiloto"
                            onChange={handlelibretaMCopilotoChange}
                          >
                            <option>Seleccione...</option>
                            {showOptionsCopiloto.map((copiloto) => (
                              <option
                                key={copiloto.libretaM}
                                value={copiloto.libretaM}
                              >
                                {copiloto.libretaM}
                              </option>
                            ))}
                          </select>
                          <p>{nombreCopiloto}</p>
                        </div>

                        <div className="contenedorTripCabina">
                          <label
                            className="textoPageOperacion"
                            htmlFor="tripulacion"
                          >
                            Elija la tripulacion:
                          </label>
                          <select id="tripulacion" onChange={handleTripChange}>
                            <option>Seleccione...</option>
                            {showOptionsTrip.map((tripulacion) => (
                              <option
                                key={tripulacion.nombre}
                                value={tripulacion.nombre}
                              >
                                {tripulacion.nombre}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="contenedorDesp">
                        <div className="contenedorInfoDespegueAterrizaje">
                          <label
                            className="textoPageOperacion"
                            htmlFor="ciudad"
                          >
                            {" "}
                            Seleccione lugar de despegue:{" "}
                          </label>
                          <select id="ciudad" onChange={handleCiudadSalida}>
                            <option>Seleccione...</option>
                            {showOptionsCiudadSalida.map((ciudad) => (
                              <option
                                key={ciudad.municipio}
                                value={ciudad.municipio}
                              >
                                {ciudad.municipio}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="contenedorInfoDespegueAterrizaje">
                          <label
                            className="textoPageOperacion"
                            htmlFor="ciudad"
                          >
                            {" "}
                            Seleccione lugar de aterrizaje:{" "}
                          </label>
                          <select id="ciudad" onChange={handleCiudadAterrizaje}>
                            <option>Seleccione...</option>
                            {showOptionsCiudadAterrizaje.map((ciudad) => (
                              <option
                                key={ciudad.municipio}
                                value={ciudad.municipio}
                              >
                                {ciudad.municipio}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="contenedorInfoDespegueAterrizaje">
                          <label className="textoPageOperacion">
                            {" "}
                            Seleccione fecha de salida:{" "}
                          </label>
                          <input
                            type="date"
                            onChange={(e) =>
                              setValue("fechaSalida", e.target.value)
                            }
                          ></input>
                        </div>

                        <div className="contenedorInfoDespegueAterrizaje">
                          <label className="textoPageOperacion">
                            {" "}
                            Seleccione hora de salida:{" "}
                          </label>
                          <input
                            placeholder="00:00"
                            onChange={(e) =>
                            setValue("horaSalida", e.target.value)
                            }
                          ></input>
                        </div>
                      </div>
                    </div>

                    <div className="contenedorMaterialGenerar">
                      <div className="tituloMaterialABordo">
                        <p className="textoPageOperacion">
                          MATERIAL A BORDO: {contadorMateriales}
                        </p>
                      </div>
                      <div className="botonesMaterialABordo">
                        <button
                          type="button"
                          onClick={agregarMaterial}
                          className="botonAñadir"
                        >
                          añadir
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteMaterial(materiales.length - 1)
                          }
                          className="botonEliminar"
                          disabled={materiales.length === 0}
                        >
                          Eliminar
                        </button>
                      </div>

                      {materiales.map((material, index) => (
                        <div className="contenedorIndividualMat" key={index}>
                          <InsertarMaterial
                            material={material}
                            index={index}
                            register={register}
                            setValue={setValue}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </FormProvider>
            </>
          )}
        </div>
      )}
    </div>
  );
}
