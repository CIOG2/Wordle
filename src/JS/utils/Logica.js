const respuesta = "BOTES";



let palabra = '';
let contador = 0;
let renglon = 0;



const Logica = (target) =>{
    if( target.classList.contains('letras__button') ) {
        if(palabra.length < respuesta.length){    
            if (palabra === '') {
                document.getElementById(`contenedor${renglon}`).childNodes[contador].textContent = target.textContent;
                palabra = target.innerText;
                contador++;
            }else{
                document.getElementById(`contenedor${renglon}`).childNodes[contador].textContent = target.textContent;
                palabra += target.innerText;
                contador++;
            }
        }
    } else if (target.id == 'botonDone' && contador == respuesta.length){
        if (palabra === respuesta) {
            palabra = palabra.split('');
            for (let i = 0; i < respuesta.length; i++) {                
                let contenedor = document.getElementById(`contenedor${renglon}`).childNodes[i];
                contenedor.style.backgroundColor = 'rgb(0, 161, 0)';
                document.getElementById(palabra[i]).style.backgroundColor = 'rgb(0, 161, 0)';
            }    
            setTimeout(() => {
                alert('Ganaste')
            }, 500); 
        } else {
            let res = respuesta.split('');
            palabra = palabra.split('');
            for (let i = 0; i < respuesta.length; i++) {                
                if(res.includes(palabra[i])){
                    let contenedor = document.getElementById(`contenedor${renglon}`).childNodes[i];
                    contenedor.style.backgroundColor = 'orange';    
                    if (document.getElementById(palabra[i]).style.backgroundColor !== 'rgb(0, 161, 0)') {
                        document.getElementById(palabra[i]).style.backgroundColor = 'orange';
                    }
                } else {
                    let contenedor = document.getElementById(`contenedor${renglon}`).childNodes[i];
                    contenedor.style.backgroundColor = 'rgb(112, 112, 112)';        
                    document.getElementById(palabra[i]).style.backgroundColor = 'rgb(112, 112, 112)';
                }
                if (res[i] === palabra[i]) {
                    let contenedor = document.getElementById(`contenedor${renglon}`).childNodes[i];
                    contenedor.style.backgroundColor = 'rgb(0, 161, 0)';
                    document.getElementById(palabra[i]).style.backgroundColor = 'rgb(0, 161, 0)';
                }
            }

            if (target.id === 'botonDone' && contador === respuesta.length && renglon === 5){
                setTimeout(() => {
                    alert('perdiste') 
                }, 500);
            } 
            contador = 0;
            palabra = '';
            renglon++;
        }
    } else if( target.id == 'botonBorrar' ){
        if (palabra === '') {
            alert("No hay nada que borrar");
        }else{
            let letras = palabra.length;
            palabra = palabra.substring(0, letras-1);
            contador--;
            document.getElementById(`contenedor${renglon}`).childNodes[contador].textContent = '';
        }
    }
}

export default Logica;