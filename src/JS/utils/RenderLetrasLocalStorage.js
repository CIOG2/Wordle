import { Validacion } from "./Logica.js";

const RenderLetrasLocalStorage = (palabras, contenedorType) => {
    palabras.map((iteam) => {
        iteam.letras.forEach(element => {
            Validacion(element,'TecladoLocalStorage', contenedorType);
        });
        if (iteam.checked) {
            Validacion('TecladoLocalStorage', contenedorType );
        }    
    })
}

export default RenderLetrasLocalStorage;