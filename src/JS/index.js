import Header from "./components/Header.js"
import ContenedorLetras from "./components/ContenedorLetras.js";
import Letras from "./components/Letras.js";
import Logica from "./utils/Logica.js";

const respuesta = "CARRO";



const app = document.getElementById('app');
app.append( Header(), ContenedorLetras(respuesta), Letras() );


document.onclick = (e) => {
    Logica(e, 'TecladoVirtual');
}

document.addEventListener('keydown', (e) => {
    Logica(e , 'TecladoFisico');
});