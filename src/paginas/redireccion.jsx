import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Redireccion() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (user && user.emailVerified) {
      navigate("/inicio");
    } else {
      navigate("/bienvenida"); // o /login directamente si prefieres
    }
  }, [user, loading, navigate]);

  return <p>Cargando...</p>;
}

export default Redireccion;
