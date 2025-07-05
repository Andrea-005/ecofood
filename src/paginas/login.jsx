import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, correo, clave);
      navigate("/inicio");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="contenedor">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
      <p>
        ¿Olvidaste tu contraseña? <a href="/recuperar-password">Recupérala aquí</a>
      </p>
    </div>
  );
}

export default Login;
