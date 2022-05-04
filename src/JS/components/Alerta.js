import ContenedorLetras from "./ContenedorLetras.js";


const Alerta = (respuesta,data) => {


    const image = document.createElement('img');
    image.src = 'https://i.ibb.co/dJKH4Xs/checked.png';
    image.classList.add('image-alerta');

    setTimeout(() => {
        image.style.transition = 'all .5s';
        image.style.boxShadow = '3px 3px 5px 0px rgb(0 0 0)';
        setTimeout(() => {
            image.style.animation = 'awaitAnimation 5s infinite';
        }, 500);
    }, 1500);


    const containerImgage = document.createElement('div');
    containerImgage.classList.add('container__image');
    containerImgage.append(image);








    const text = document.createElement('p');
    text.classList.add('container__text--text');
    text.textContent = 'RESPUESTA:';

    const palabra = document.createElement('h2');
    palabra.classList.add('container__text--palabra');
    palabra.textContent = respuesta;

    const containerText = document.createElement('div');
    containerText.classList.add('container__text');
    containerText.append( text, palabra );





    const ResultadoJuego = document.createElement('div');
    ResultadoJuego.classList.add('container__resultado');



    const BotonContinuar = document.createElement('button');
    BotonContinuar.classList.add('container__resultado--boton');
    BotonContinuar.textContent = 'Continuar';
    BotonContinuar.onclick = () => {
        document.getElementById('alerta-de-juego').remove();
    }

    const alerta = document.createElement('div');
    alerta.classList.add('section__container--alert');
    alerta.append( containerImgage, containerText, ResultadoJuego, BotonContinuar);

    const containerAlert = document.createElement('section');
    containerAlert.classList.add('section__alert');
    containerAlert.id = 'alerta-de-juego';
    containerAlert.append(alerta);

    return containerAlert;
}

export default Alerta;