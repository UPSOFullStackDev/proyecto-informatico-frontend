import React from 'react'
import RiseLoader from "react-spinners/RiseLoader";
/**
 * Componente funcional que representa un indicador de carga (spinner).
 * @returns {JSX.Element} - Elemento JSX que contiene el indicador de carga.
 */
function Loader() {
  return (
    <div>
      <RiseLoader
        color={"rgba(143, 215, 239, 0.8)"}
        loading={true}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
        style={{ marginLeft: "20px" }}
      />
    </div>
  )
}

export default Loader