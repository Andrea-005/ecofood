import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function MenuPrincipal() {
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="contenedor">
      <h2>Menú Principal</h2>
      <p>Has iniciado sesión correctamente.</p>
      <button onClick={cerrarSesion}>Cerrar Sesión</button>
    </div>
  );
}

export default MenuPrincipal;
