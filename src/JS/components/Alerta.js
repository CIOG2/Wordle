const Alerta = (respuesta) => {
    
    const palabra = document.createElement('h2')
    palabra.classList.add('container--alert-palabra');
    palabra.textContent = respuesta;

    const ResultadoJuego = document.createElement('div')

    const BotonContinuar = document.create 

    const alerta = document.createElement('div')
    alerta.classList.add('section__container--alert');
    alerta.append(palabra);

    const containerAlert = document.createElement('section')
    containerAlert.classList.add('section__alert')
    containerAlert.append(alerta)

    return containerAlert;
}

export default Alerta;