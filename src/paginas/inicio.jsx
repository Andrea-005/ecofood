import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Inicio() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const irARegistro = () => navigate("/registro");
  const irALogin = () => navigate("/login");

  return (
    <div className="contenedor">
      {user ? (
        <>
          <h2>Bienvenido {user.email}</h2>
          <p>Tu sesión ya está activa.</p>
        </>
      ) : (
        <>
          <h2>¿Eres nuevo en EcoFood?</h2>
          <button onClick={irARegistro}>Cliente Nuevo</button>
          <p>¿Ya tienes cuenta?</p>
          <button onClick={irALogin}>Cliente Existente</button>
        </>
      )}
    </div>
  );
}

export default Inicio;
