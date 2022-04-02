const respuesta = "CARRO";
let palabra = '';
let contador = 0;
let renglon = 0;
const letras = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

const Logica = ( evento, tipoTeclado) =>{

    if(evento.target.classList.contains('container__letras--button') || letras.includes(evento.key) ) {
        if(palabra.length < respuesta.length){    
            if (palabra === '') {
                if (tipoTeclado === 'TecladoFisico') {
                    document.getElementById(`contenedor${renglon}`).childNodes[contador].textContent = evento.key.toUpperCase();
                    palabra = evento.key.toUpperCase();
                } else {
                    document.getElementById(`contenedor${renglon}`).childNodes[contador].textContent = evento.target.textContent;
                    palabra = evento.target.innerText;
                }
                contador++;
            }else{
                if (tipoTeclado === 'TecladoFisico') {
                    document.getElementById(`contenedor${renglon}`).childNodes[contador].textContent = evento.key.toUpperCase();
                    palabra += evento.key.toUpperCase();

                } else {
                    document.getElementById(`contenedor${renglon}`).childNodes[contador].textContent = evento.target.textContent;
                    palabra += evento.target.innerText;
                }
                contador++;
            }
        }
    } else if ((evento.target.id == 'botonDone' && contador == respuesta.length) || (evento.key == 'Enter' && contador == respuesta.length)) {
        if (palabra === respuesta) {
            palabra = palabra.split('');
            for (let i = 0; i < respuesta.length; i++) {                
                let contenedor = document.getElementById(`contenedor${renglon}`).childNodes[i];
                contenedor.style.backgroundColor = 'rgb(0, 161, 0)';
                document.getElementById(palabra[i]).style.backgroundColor = 'rgb(0, 161, 0)';
            }    
            setTimeout(() => {
                swal('Easy', 'Felicidades, Ganaste el juego!', 'success')
            }, 500); 
        } else {
            let res = respuesta.split('');
            palabra = palabra.split('');
            for (let i = 0; i < respuesta.length; i++) {                
                validacionEfecto(palabra, res, i);                    
            }
            if (evento.target.id === 'botonDone' && contador === respuesta.length && renglon === 5){
                setTimeout(() => {
                    alert('perdiste') 
                }, 500);
            } 
            contador = 0;
            palabra = '';
            renglon++;
        }
    } else if(evento.target.id === 'botonBorrar' || evento.key === 'Backspace' ){
        if (!(palabra === '')) {
            let letras = palabra.length;
            palabra = palabra.substring(0, letras-1);
            contador--;
            document.getElementById(`contenedor${renglon}`).childNodes[contador].textContent = '';
        }
    }
}

const validacionEfecto = (palabra, res, i) => {
    setTimeout(() => {
        if(res.includes(palabra[i])){
            let contenedor = document.getElementById(`contenedor${renglon-1}`).childNodes[i];
        contenedor.style.backgroundColor = 'orange';    
        if (document.getElementById(palabra[i]).style.backgroundColor !== 'rgb(0, 161, 0)') {
            document.getElementById(palabra[i]).style.backgroundColor = 'orange';
        }
        } else {
            let contenedor = document.getElementById(`contenedor${renglon-1}`).childNodes[i];
            contenedor.style.backgroundColor = 'rgb(112, 112, 112)';        
            document.getElementById(palabra[i]).style.backgroundColor = 'rgb(112, 112, 112)';
        }
        if (res[i] === palabra[i]) {
            let contenedor = document.getElementById(`contenedor${renglon-1}`).childNodes[i];
            contenedor.style.backgroundColor = 'rgb(0, 161, 0)';
            document.getElementById(palabra[i]).style.backgroundColor = 'rgb(0, 161, 0)';
        }
        document.getElementById(`contenedor${renglon-1}`).childNodes[i].classList.add('efecto-de-rotacion');
    }, 500 * i);
}



export default Logica;