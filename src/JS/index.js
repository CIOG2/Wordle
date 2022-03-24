import Header from "./components/Header.js"
import Letras from "./components/Letras.js";

const app = document.getElementById('app');
app.append( Header(), Letras() );
let palabra = '';
const respuesta = "HOLA22";


document.body.onclick = (e) => {
    const target = e.target;

    if(palabra.length < respuesta.length){    
        if( target.classList.contains('letras__button') ) {
            if (palabra === '') {
                palabra = target.innerText;
            }else{
                palabra += target.innerText;
            }
            console.log("palabra: ", palabra);
        }
    }
    if( target.id == 'botonBorrar' ){
        if (palabra === '') {
            alert("No hay nada que borrar");
        }else{
            let letras = palabra.length;
            palabra = palabra.substring(0, letras-1);
            console.log('palabra mocha: ', palabra);
        }
    }
}