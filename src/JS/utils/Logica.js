import LetrasLocalStorage from "./LetrasLocalStorage.js";
import LocalStorage from "./LocalStorage.js";
import { descifrar } from "./CifrarTexto.js";
import data from '../data/palabras.js';
import NumerosAleatorios from "./NumerosAleatorios.js";
import Limpieza from "./Limpieza.js";
import Alerta from "../components/Alerta.js";
import RenderLetrasLocalStorage from "./RenderLetrasLocalStorage.js";



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
let RENDER = true;
const letras = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];



const Validacion = (evento, tipoTeclado, contenedorType) => {
    if (tipoTeclado === 'TecladoFisico') {
        if (letras.includes(evento.key)) {
            AgregarLetras(evento.key.toUpperCase(), tipoTeclado, contenedorType);
        } else if (evento.key == 'Enter' && contador == respuesta.length){
            ValidarLetras(tipoTeclado, 'contenedor');
        } else if (evento.key === 'Backspace' ){
            EliminarLetras();
        }
    } 
    else if (tipoTeclado === 'TecladoVirtual') {    
        if(evento.target.classList.contains('container__letras--button')){
            AgregarLetras(evento.target.textContent, tipoTeclado, contenedorType);
        } else if (evento.target.id == 'botonDone' && contador == respuesta.length) {
            ValidarLetras(tipoTeclado, 'contenedor');
        } else if( evento.target.id === 'botonBorrar'){
            EliminarLetras();
        }
    } else {
        if (evento === 'TecladoLocalStorage') {
            ValidarLetras(evento , tipoTeclado);
        } else {
            AgregarLetras(evento, tipoTeclado , contenedorType);
        }
    }
}

const AgregarLetras = (Letra, tipoTeclado, contenedorType) => {
    if(palabra.length < respuesta.length){
        let contadorLetra = document.getElementById(`${contenedorType}${renglon}`).childNodes[contador]; 
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

const ValidarLetras = (tipoTeclado, contenedorType) => {    
    if (palabra === respuesta) {
        palabra = palabra.split('');
        for (let i = 0; i < respuesta.length; i++) {                
            let contenedor = document.getElementById(`${contenedorType}${renglon}`).childNodes[i];
            contenedor.style.backgroundColor = 'rgb(0, 161, 0)';
            document.getElementById(palabra[i]).style.backgroundColor = 'rgb(0, 161, 0)';            
        }  
        setTimeout(() => {
            localStorageData = LocalStorage().get('Wordle');
            renglon = 0;
            palabra = '';
            contador = 0;
            const app = document.getElementById('app');
            app.appendChild(Alerta(respuesta, true));
            RenderLetrasLocalStorage(localStorageData.palabras, 'contenedorFake');
            for (let i = 0; i < respuesta.length; i++) {                
                let contenedor = document.getElementById(`contenedorFake${renglon}`).childNodes[i];
                contenedor.style.backgroundColor = 'rgb(0, 161, 0)';
                document.getElementById(palabra[i]).style.backgroundColor = 'rgb(0, 161, 0)';            
            }   
            respuesta = descifrar(data[localStorageData.orden.ordenPalabras[parseInt(localStorageData.orden.position) + 1]]);
            renglon = 0;
            palabra = '';
            contador = 0;
            setTimeout(() => {
                Limpieza();
            }, 200);
        }, 500); 
    } else {
        
        LetrasLocalStorage(renglon, palabra, true);
        let res = respuesta.split('');
        palabra = palabra.split('');
        for (let i = 0; i < respuesta.length; i++) {                
            if (tipoTeclado === 'TecladoLocalStorage') {
                validacionLetrasSinEfecto(palabra, res, i, contenedorType);
            } else{
                if (contador === respuesta.length && renglon === 5) {
                    validacionLetrasSinEfecto(palabra, res, i, contenedorType);
                }else{
                    validacionLetrasEfecto(palabra, res, i, contenedorType);                   
                }
            }
        }
        renglon++;
        if (contador === respuesta.length && renglon === 6  ){
            setTimeout(() => {
                localStorageData = LocalStorage().get('Wordle');
                renglon = 0;
                palabra = '';
                contador = 0;
                const app = document.getElementById('app');
                if (RENDER) {
                    app.appendChild(Alerta(respuesta, false));
                    RenderLetrasLocalStorage(localStorageData.palabras, 'contenedorFake');
                    RENDER = false;
                    setTimeout(() => {
                        RENDER = true;
                    }, 5000);
                }
                respuesta = descifrar(data[localStorageData.orden.ordenPalabras[parseInt(localStorageData.orden.position) + 1]]);
                renglon = 0;
                palabra = '';
                contador = 0;
                setTimeout(() => {
                    Limpieza();
                }, 200);
            }, 1000);
        }
        contador = 0;
        palabra = '';
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
        setTimeout(() => {
            document.getElementById(`contenedor${renglon-1}`).childNodes[i].classList.remove('efecto-de-rotacion');
        }, 1000);
    }, 450 * i);
}


const validacionLetrasSinEfecto = (palabra, res, i, contenedorType) => {
        let contenedor = document.getElementById(`${contenedorType}${renglon}`).childNodes[i];

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