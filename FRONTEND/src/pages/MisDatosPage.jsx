import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import { updateUserPicRequest } from "../api/auth";
import IsLoading from "../components/IsLoading";

export default function MisDatosPage() {
  const { user, updateUser } = useAuth();
  const { register, handleSubmit, setValue } = useForm();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const toggleEditing = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      console.log(file.name);
      const isNameOfOneImageRegEx = /.(jpe?g|gif|png)$/i;
      const isValidType = isNameOfOneImageRegEx.test(file.name);
      const isValidSize = file.size < 50 * 1024 * 1024;
      if (!isValidType)
        return toast.error(
          "el archivo debe tener una extension .jpeg, .jpg, .png o .gif"
        );
      if (!isValidSize)
        return toast.error("La imagen debe pesar menos de 50MB");
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const newData = {};

      for (const key in data) {
        if (data[key] !== "") {
          newData[key] = data[key];
        }
      }

      if (Object.keys(newData).length > 0) {
        await updateUser(userData.id, newData);
        setIsEditing(false);
        window.location.reload();
      } else {
        console.log("No se han realizado cambios.");
      }
    } catch (error) {
      console.error("Error al actualizar datos:", error);
    }
  });

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  const handleUpload = () => {
    console.log(selectedFile);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("fotoUsuario", selectedFile);
      updateUserPicRequest(userData.id, formData);
      setSelectedFile(null);
      window.location.reload();
    } else {
      toast.error("No se ha seleccionado ningún archivo");
    }
  };

  return (
    <div>
      {isLoading ? (<IsLoading/>
      ) : (
        <div className="contenedorMisDatos">
          {
            <form className="formulario1" id="formulario1" onSubmit={onSubmit}>
              <h2 className="tituloMisDatos">MIS DATOS</h2>
              <div className="datosUsuario">
                <div className="informacionTextualUsuario">
                  <label className="labelDatosUsuario" for="nombre">
                    Nombre
                  </label>

                  <p>{userData.name ? userData.name.toUpperCase() : ""}</p>

                  <label for="nombre">Correo Electronico</label>

                  <p>{userData.email ? userData.email : ""}</p>

                  <label for="nombre">Celular</label>

                  {!isEditing ? (
                    <input
                      id="nombre"
                      type="number"
                      placeholder={!userData.celular ? "" : userData.celular}
                      {...register("celular")}
                    ></input>
                  ) : (
                    <p>
                      {!userData.celular ? (
                        <p>AGREGUE UN NUMERO CELULAR</p>
                      ) : (
                        <>{userData.celular}</>
                      )}
                    </p>
                  )}

                  <label for="nombre">Domicilio</label>
                  {!isEditing ? (
                    <input
                      id="nombre"
                      type="string"
                      placeholder={
                        !userData.domicilio ? "" : userData.domicilio
                      }
                      {...register("domicilio")}
                    ></input>
                  ) : (
                    <p>
                      {!userData.domicilio ? (
                        <p>AGRUEGUE UNA DIRECCION</p>
                      ) : (
                        <>{userData.domicilio}</>
                      )}
                    </p>
                  )}
                  <label for="nombre">Fecha de Nacimiento</label>

                  {!isEditing ? (
                    <input
                      id="nombre"
                      type="date"
                      {...register("fechaNacimiento")}
                    ></input>
                  ) : (
                    <p>
                      {!userData.fechaNacimiento ? (
                        <p>AGRUEGUE UNA FECHA DE NACIMIENTO</p>
                      ) : (
                        <>{userData.fechaNacimiento}</>
                      )}
                    </p>
                  )}

                  <label for="nombre">Libreta Militar</label>

                  <p>
                    {userData.libretaMilitar
                      ? userData.libretaMilitar.toUpperCase()
                      : ""}
                  </p>

                  <label for="nombre">Cedula de ciudadania</label>
                  {!isEditing ? (
                    <input
                      id="nombre"
                      type="number"
                      placeholder={!userData.cedula ? "" : userData.cedula}
                      {...register("cedula")}
                    ></input>
                  ) : (
                    <p>
                      {!userData.cedula ? (
                        <p>AGRUEGUE SU CEDULA DE CIUDADANIA</p>
                      ) : (
                        <>{userData.cedula}</>
                      )}
                    </p>
                  )}
                </div>

                <div className="fotoUsuario">
                  <img className="ImgFotoUsuario" src={userData.fotoUsuario} />
                  <button
                    className="botonesFotoUsuario"
                    type="button"
                    onClick={toggleModal}
                  >
                    {" "}
                    Cargar imagen{" "}
                  </button>

                  <Modal className="modal" show={showModal}>
                    <button className="botonCerrarModal" onClick={toggleModal}>
                      {" "}
                      X{" "}
                    </button>
                    <div className="contenedorModalMisDatos">
                      <h3 className="tituloSubirFoto">SUBIR FOTO DE USUARIO</h3>

                      <label className="labelSubirfoto" htmlFor="fileInput">
                        {" "}
                        <p className="textoSubirFoto">SUBIR FOTO</p>{" "}
                        <p className="textoFileSelected">
                          {selectedFile ? selectedFile.name : ""}
                        </p>
                      </label>
                      <input
                        className="inputElegirArchivoMisDatos"
                        type="file"
                        name="fotoUsuario"
                        id="fileInput"
                        accept=".jpg, .jpeg, .gif, .png"
                        {...register("fotoUsuario")}
                        onChange={handleFileChange}
                      />
                    </div>
                    <button
                      className="botonActualizarFoto"
                      form="formulario2"
                      onClick={handleUpload}
                    >
                      Actualizar Foto de Usuario
                    </button>
                  </Modal>

                  {isEditing ? (
                    <button className="botonesFotoUsuario" type="button" onClick={toggleEditing}>
                      {" "}
                      Editar Datos{" "}
                    </button>
                  ) : (
                    <button className="botonesFotoUsuario" type="button" onClick={toggleEditing}>
                      {" "}
                      Cancelar{" "}
                    </button>
                  )}

                  {!isEditing && (
                    <button className="botonesFotoUsuario" type="submit" form="formulario1">
                      {" "}
                      Guardar Cambios{" "}
                    </button>
                  )}
                </div>
              </div>
            </form>
          }
        </div>
      )}
    </div>
  );
}
