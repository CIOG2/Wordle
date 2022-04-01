import Header from "./components/Header.js"
import ContenedorLetras from "./components/ContenedorLetras.js";
import Letras from "./components/Letras.js";
import Logica from "./utils/Logica.js";

const respuesta = "BOTES";



const app = document.getElementById('app');
app.append( Header(), ContenedorLetras(respuesta), Letras() );




document.body.onclick = (e) => {
    Logica(e.target);
}