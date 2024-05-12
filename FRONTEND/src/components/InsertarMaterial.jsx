import React, { useState, useEffect } from "react";
import { materialRequest } from "../api/dataGenerarOperacion.js";

function InsertarMaterial({ onDelete, index, register, setValue }) {
  const [showOptionsMaterial, setOptionsMaterial] = useState([]);
  const [codigoOnu, setCodigoOnu] = useState("");
  const [claseMaterial, setClaseMaterial] = useState("");
  const [unidades, setUnidades] = useState(0);
  const [pesoMaterial, setPesoMaterial] = useState(0);

  useEffect(() => {
    async function fetchDataMaterial() {
      try {
        const data = await materialRequest(); // Obtener datos de materiales mediante materialRequest
        setOptionsMaterial(data.data);
      } catch (error) {
        console.error("Error fetching material data:", error);
      }
    }
    fetchDataMaterial();
  }, []);

  

  const handleNombreMaterialChange = (event) => {
    const selectedNombreMaterial = event.target.value;
    const materialSeleccionado = showOptionsMaterial.find(
      (material) => material.nombre === selectedNombreMaterial
    );
    if (materialSeleccionado) {
      setValue(`materialAbordo.${index}.material`, materialSeleccionado._id);
      setCodigoOnu(materialSeleccionado.onuId);
      setClaseMaterial(materialSeleccionado.clase);
    } else {
      setCodigoOnu("");
      setClaseMaterial("");
    }
  };

  const handleUnidadesChange = (event) => {
    const unidadesValue = parseInt(event.target.value);
    setUnidades(unidadesValue);
    setValue(`materialAbordo.${index}.piezasMaterial`, unidadesValue);
  };

  const handlePesoMaterialChange = (event) => {
    const pesoValue = parseFloat(event.target.value);
    setPesoMaterial(pesoValue);
    setValue(`materialAbordo.${index}.pesoMaterial`, pesoValue);
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
      e.preventDefault();
    }
  };

  return (
    <div className="tarjetaDeMaterial">
        <label htmlFor={`nombreMaterial${index}`} className="seleccionTipoRiesgo">
          Seleccione el material:
        </label>
        <select id={`nombreMaterial${index}`} onChange={handleNombreMaterialChange}>
          <option>Seleccione...</option>
          {showOptionsMaterial.map((material) => (
            <option key={material._id} value={material.nombre}>
              {material.nombre}
            </option>
          ))}
        </select>

        <p>Codigo ONU: {codigoOnu}</p>

        <p>Clase Material: {claseMaterial}</p>

        <p className="numeroPiezas">
          Unidades:{" "}
          <input
            className="insertarNumeroPiezas"
            type="number"
            min="0"
            max="99"
            value={unidades}
            onChange={handleUnidadesChange}
            onKeyDown={handleKeyDown}
          />
        </p>

        <p className="pesoMaterial">
          Peso en Kg:{" "}
          <input
            className="insertarPesoKg"
            type="number"
            value={pesoMaterial}
            onChange={handlePesoMaterialChange}
            onKeyDown={handleKeyDown}
          />
        </p>

    </div>
  );
}

export default InsertarMaterial;