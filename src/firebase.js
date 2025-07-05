// Importar módulos de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCbCNmKpAasdR-up9Vbo848fINNiP4jG08",
  authDomain: "ecofood-app-1e2c7.firebaseapp.com",
  projectId: "ecofood-app-1e2c7",
  storageBucket: "ecofood-app-1e2c7.appspot.com",
  messagingSenderId: "408465400752",
  appId: "1:408465400752:web:5a6b5336f20ab976aaac75"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
