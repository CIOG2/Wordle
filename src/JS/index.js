import Header from "./components/Header.js"
import ContenedorLetras from "./components/ContenedorLetras.js";
import Letras from "./components/Letras.js";
import { Validacion } from "./utils/Logica.js";
import LocalStorage from "./utils/LocalStorage.js";
import RenderLetrasLocalStorage from "./utils/RenderLetrasLocalStorage.js";
import GanasteAlerta from "./components/GanasteAlerta.js";


const data = LocalStorage().get('Wordle');
if (!(data === null)) {
    if (data[0]) {
        LocalStorage().remove('Wordle');
    }    
}

const app = document.getElementById('app');
app.append( Header(), ContenedorLetras(5), Letras());


if (!(data === null)) {
    if (Object.keys(data).includes('palabras')) {
        RenderLetrasLocalStorage(data.palabras);
    }
}
document.onclick = (e) => {
    Validacion(e, 'TecladoVirtual');
}

document.addEventListener('keydown', (e) => {
    Validacion(e , 'TecladoFisico');
});