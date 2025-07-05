import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    direccion: '',
    comuna: '',
    telefono: ''
  });

  const [procesando, setProcesando] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMensaje, setModalMensaje] = useState('');
  const [redirigir, setRedirigir] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (procesando) return;

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      setModalMensaje("La contraseña debe tener mínimo 6 caracteres y combinar letras y números.");
      setModalVisible(true);
      return;
    }

    setProcesando(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await sendEmailVerification(user);

      await setDoc(doc(db, "usuarios", user.uid), {
        nombre: formData.nombre,
        email: formData.email,
        direccion: formData.direccion,
        comuna: formData.comuna,
        telefono: formData.telefono,
        tipo: "cliente"
      });

      setModalMensaje("Cliente registrado exitosamente. Redirigiendo al inicio...");
      setModalVisible(true);
      setRedirigir(true);

      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (error) {
      let mensaje = "Ocurrió un error. Intenta nuevamente.";
      if (error.code === "auth/email-already-in-use") {
        mensaje = "Este correo ya está registrado. Intenta iniciar sesión o usa otro.";
      }
      setModalMensaje(mensaje);
      setModalVisible(true);
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div className="contenedor-formulario">
      <h2 className="titulo">Registro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre completo" onChange={handleChange} required className="campo" />
        <input name="email" type="email" placeholder="Correo electrónico" onChange={handleChange} required className="campo" />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required className="campo" />
        <input name="direccion" placeholder="Dirección" onChange={handleChange} required className="campo" />
        <input name="comuna" placeholder="Comuna" onChange={handleChange} required className="campo" />
        <input name="telefono" placeholder="Teléfono (opcional)" onChange={handleChange} className="campo" />
        <input value="cliente" disabled className="campo" />
        <button type="submit" disabled={procesando} className="boton">
          {procesando ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      {modalVisible && (
        <div className="modal-fondo">
          <div className="modal-contenido">
            <p>{modalMensaje}</p>
            {!redirigir && (
              <button onClick={() => setModalVisible(false)} className="boton">Cerrar</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Registro;
