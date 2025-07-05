import React from "react";
import { useNavigate } from "react-router-dom";

function Bienvenida() {
  const navigate = useNavigate();

  return (
    <div className="contenedor">
      <h2>Bienvenido a EcoFood</h2>
      <p>¿Eres un cliente nuevo o ya tienes cuenta?</p>
      <button onClick={() => navigate("/registro")}>Cliente nuevo</button>
      <button onClick={() => navigate("/login")}>Cliente existente</button>
    </div>
  );
}

export default Bienvenida;
