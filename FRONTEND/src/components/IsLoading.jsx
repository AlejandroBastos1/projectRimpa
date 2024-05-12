import React, { useEffect, useState } from 'react';

const IsLoading = () => {
  const [segments, setSegments] = useState(0);

  useEffect(() => {
    // Simulamos la carga progresiva aumentando el número de segmentos iluminados cada cierto tiempo
    const interval = setInterval(() => {
      setSegments((prevSegments) => (prevSegments < 12 ? prevSegments + 1 : 0)); // Cambia la cantidad de segmentos iluminados
    }, 500);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  return (
    <div className="loader-container">
      <div className="loader">
      </div>
      <p>Cargando...</p>
    </div>
  );
};

export default IsLoading;
