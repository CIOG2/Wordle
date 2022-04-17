import LocalStorage from "./LocalStorage.js";
import { letras } from "./Logica.js";

const Limpieza = () => {
    let Data = LocalStorage().get('Wordle');

    Data.palabras = [];
    Data.orden.position = Data.orden.position++;
    Data.orden.position = parseInt(Data.orden.position) + 1;
    LocalStorage().set('Wordle', Data);

    for (let i = 0; i < (letras.length/2); i++) {
        const letra = document.getElementById(`${letras[i]}`);
        letra.style.removeProperty('background-color');
    }
    for (let i = 0; i < 6; i++) {
        const contenedor = document.getElementById(`contenedor${i}`);
        for (let j = 0; j < contenedor.childNodes.length; j++) {      
            contenedor.childNodes[j].style.removeProperty('background-color');
            contenedor.childNodes[j].textContent = '';
        }
    }
}

export default Limpieza;