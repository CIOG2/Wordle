const crearBotones = (array) => {

    const botones = [];

    array.forEach(element => {
        const button = document.createElement('button');
        button.classList.add('letras__button');
        button.innerText = element;
        botones.push(button);
    });

    return botones;
}


const Letras = () => {
    const letrasLinea1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const letrasLinea2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'];
    const letrasLinea3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
    
    const Linea1 = document.createElement('div');
    Linea1.classList.add('letras__linea');
    Linea1.append(...crearBotones(letrasLinea1));

    const Linea2 = document.createElement('div');
    Linea2.classList.add('letras__linea');
    Linea2.append(...crearBotones(letrasLinea2));



    const botonDone = document.createElement('button');
    botonDone.classList.add('letras__button--done');
    botonDone.textContent = '✔';
    botonDone.id = 'botonDone';

    const botonBorrar = document.createElement('button');
    botonBorrar.classList.add('letras__button--borrar');
    botonBorrar.innerText = 'X';
    botonBorrar.id = "botonBorrar"



    const Linea3 = document.createElement('div');
    Linea3.classList.add('letras__linea');
    let array3 = crearBotones(letrasLinea3);
    array3.unshift(botonDone);
    array3.push(botonBorrar);
    Linea3.append(...array3);
    
    const letterContainer = document.createElement('div');
    letterContainer.classList.add('letras__container');
    letterContainer.append( Linea1, Linea2, Linea3 );

    return letterContainer;
}

export default Letras;