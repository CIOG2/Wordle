import { Validacion } from "./Logica.js";

const RenderLetrasLocalStorage = (palabras) => {
    palabras.map((iteam) => {
        iteam.letras.forEach(element => {
            Validacion(element);
        });
        if (iteam.checked) {
            Validacion('TecladoLocalStorage');
        }    
    })
}

export default RenderLetrasLocalStorage;