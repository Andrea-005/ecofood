import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const RecuperarPassword = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMensaje("Se ha enviado un correo para restablecer tu contraseña.");
    } catch (err) {
      setError("Hubo un problema. Verifica el correo ingresado.");
    }
  };

  return (
    <div className="contenedor-formulario">
      <h2 className="titulo">Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Ingresa tu correo electrónico"
          required
          className="campo"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="boton">Enviar correo de recuperación</button>
      </form>

      {mensaje && <p style={{ color: "green", marginTop: "10px" }}>{mensaje}</p>}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default RecuperarPassword;
