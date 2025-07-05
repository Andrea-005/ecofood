import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPrincipal from "./paginas/MenuPrincipal";
import Registro from "./paginas/registro";
import Login from "./paginas/login";
import Inicio from "./paginas/inicio";
import RecuperarPassword from "./paginas/recuperarpassword";
import ProtectedRoute from "./componentes/ProtectedRoute";
import Redireccion from "./paginas/redireccion";
import Bienvenida from "./paginas/bienvenida"; // opcional

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Redireccion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inicio" element={
          <ProtectedRoute>
            <Inicio />
          </ProtectedRoute>
        } />
        <Route path="/menu" element={
          <ProtectedRoute>
            <MenuPrincipal />
          </ProtectedRoute>
        } />
        <Route path="/recuperar-password" element={<RecuperarPassword />} />
        <Route path="/bienvenida" element={<Bienvenida />} />
        <Route path="*" element={<h2>Página no encontrada</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
