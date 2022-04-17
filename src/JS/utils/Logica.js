import LetrasLocalStorage from "./LetrasLocalStorage.js";
import LocalStorage from "./LocalStorage.js";
import { descifrar } from "./CifrarTexto.js";
import data from '../data/palabras.js';
import NumerosAleatorios from "./NumerosAleatorios.js";
import Limpieza from "./Limpieza.js";

let localStorageData = LocalStorage().get('Wordle');

if(localStorageData === null){
    let datos = {
        orden: {
            ordenPalabras: NumerosAleatorios(data.length),
            position: 0
        }
    };
    LocalStorage().set('Wordle', datos);
    localStorageData = datos;
} else {
    if (!localStorageData.orden) {
        let datos = {
            orden: {
                ordenPalabras: NumerosAleatorios(data.length),
                position: 0
            }
        };
        LocalStorage().set('Wordle', datos);
        localStorageData = datos;
    }
}

let respuesta = descifrar(data[localStorageData.orden.ordenPalabras[localStorageData.orden.position]]);
let palabra = '';
let contador = 0;
let renglon = 0;
const letras = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];



const Validacion = (evento, tipoTeclado) => {
    if (tipoTeclado === 'TecladoFisico') {
        if (letras.includes(evento.key)) {
            AgregarLetras(evento.key.toUpperCase(), tipoTeclado);
        } else if (evento.key == 'Enter' && contador == respuesta.length){
            ValidarLetras(tipoTeclado);
        } else if (evento.key === 'Backspace' ){
            EliminarLetras();
        }
    } 
    else if (tipoTeclado === 'TecladoVirtual') {    
        if(evento.target.classList.contains('container__letras--button')){
            AgregarLetras(evento.target.textContent, tipoTeclado);
        } else if (evento.target.id == 'botonDone' && contador == respuesta.length) {
            ValidarLetras(tipoTeclado);
        } else if( evento.target.id === 'botonBorrar'){
            EliminarLetras();
        }
    } else {
        if (evento === 'TecladoLocalStorage') {
            ValidarLetras('TecladoLocalStorage');
        } else {
            AgregarLetras(evento, 'TecladoLocalStorage');
        }
    }
}

const AgregarLetras = (Letra, tipoTeclado) => {
    if(palabra.length < respuesta.length){
        const contadorLetra = document.getElementById(`contenedor${renglon}`).childNodes[contador]; 

        if (!(tipoTeclado === 'TecladoLocalStorage')) {
            contadorLetra.classList.add('AnimacionLetras');    
            setTimeout(() => {
                contadorLetra.classList.remove('AnimacionLetras');
            }, 100);
        }
        if (palabra === '') {
            contadorLetra.textContent = Letra;
            palabra = Letra;
        }else{
            contadorLetra.textContent = Letra;
            palabra += Letra;
        }
        LetrasLocalStorage(renglon, palabra, false);
        contador++;
    }
}

const ValidarLetras = (tipoTeclado) => {    
    if (palabra === respuesta) {
        palabra = palabra.split('');
        for (let i = 0; i < respuesta.length; i++) {                
            let contenedor = document.getElementById(`contenedor${renglon}`).childNodes[i];
            contenedor.style.backgroundColor = 'rgb(0, 161, 0)';
            document.getElementById(palabra[i]).style.backgroundColor = 'rgb(0, 161, 0)';
        }  
        setTimeout(() => {
            swal('Easy', 'Felicidades, Ganaste el juego!', 'success');
            palabra = '';
            contador = 0;
            renglon = 0;
            respuesta = descifrar(data[localStorageData.orden.ordenPalabras[parseInt(localStorageData.orden.position) + 1]]);
            Limpieza();
        }, 500); 
    } else {
        
        LetrasLocalStorage(renglon, palabra, true);
        let res = respuesta.split('');
        palabra = palabra.split('');
        for (let i = 0; i < respuesta.length; i++) {                
            if (tipoTeclado === 'TecladoLocalStorage') {
                validacionLetrasSinEfecto(palabra, res, i);
            } else{
                validacionLetrasEfecto(palabra, res, i);                    
            }
        }
        if (contador === respuesta.length && renglon === 5){
            setTimeout(() => {
                swal(':(', 'Lo sentimos, perdiste el juego!', 'error');
                contador = 0;
                palabra = '';
                renglon= 0;
                Limpieza();
            }, 2500);
        }
        contador = 0;
        palabra = '';
        renglon++;
    }
}

const EliminarLetras = () => {
    if (!(palabra === '')) {
        contador--;
        const letras = palabra.length;
        const contadorLetras = document.getElementById(`contenedor${renglon}`).childNodes[contador];
        
        palabra = palabra.substring(0, letras-1);
        contadorLetras.textContent = '';
        contadorLetras.classList.add('AnimacionLetras');    
        
        LetrasLocalStorage(renglon, palabra, false);    
        setTimeout(() => {
            contadorLetras.classList.remove('AnimacionLetras');
        }, 100);
    }
}



const validacionLetrasEfecto = (palabra, res, i) => {
    setTimeout(() => {
        let contenedor = document.getElementById(`contenedor${renglon-1}`).childNodes[i];
        let letraContenedorColor = document.getElementById(palabra[i]);
        
        if(res.includes(palabra[i])){
            contenedor.style.backgroundColor = 'orange';    
        
            if (letraContenedorColor.style.backgroundColor !== 'rgb(0, 161, 0)') {
                letraContenedorColor.style.backgroundColor = 'orange';
            }
        } else {
            contenedor.style.backgroundColor = 'rgb(112, 112, 112)';        
            letraContenedorColor.style.backgroundColor = 'rgb(112, 112, 112)';
        }
        
        if (res[i] === palabra[i]) {
            contenedor.style.backgroundColor = 'rgb(0, 161, 0)';
            letraContenedorColor.style.backgroundColor = 'rgb(0, 161, 0)';
        }
        document.getElementById(`contenedor${renglon-1}`).childNodes[i].classList.add('efecto-de-rotacion');
    }, 450 * i);
}


const validacionLetrasSinEfecto = (palabra, res, i) => {
        let contenedor = document.getElementById(`contenedor${renglon}`).childNodes[i];
        let letraContenedorColor = document.getElementById(palabra[i]);
        
        if(res.includes(palabra[i])){
            contenedor.style.backgroundColor = 'orange';    
        
            if (letraContenedorColor.style.backgroundColor !== 'rgb(0, 161, 0)') {
                letraContenedorColor.style.backgroundColor = 'orange';
            }
        } else {
            contenedor.style.backgroundColor = 'rgb(112, 112, 112)';        
            letraContenedorColor.style.backgroundColor = 'rgb(112, 112, 112)';
        }
        
        if (res[i] === palabra[i]) {
            contenedor.style.backgroundColor = 'rgb(0, 161, 0)';
            letraContenedorColor.style.backgroundColor = 'rgb(0, 161, 0)';
        }
}



export { Validacion, letras};