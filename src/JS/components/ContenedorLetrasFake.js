const ContenedorLetrasFake = () => {
    
    const contenedorCuadros = [];

    for (let i = 0; i < 6; i++) {
        const contenedor = document.createElement('div');
        contenedor.classList.add('letras__contenedor');
        contenedor.id = `contenedorFake${i}`;

        for (let j = 0; j < 5; j++) {
            const cuadro = document.createElement('div');
            cuadro.classList.add('letras__cuadro-fake');
            contenedor.appendChild(cuadro);
        }

        contenedorCuadros.push(contenedor);
    }

    const contenedorPrincipal = document.createElement('div');
    contenedorPrincipal.classList.add('contenedor__Principal');
    contenedorPrincipal.append(...contenedorCuadros);

    return contenedorPrincipal;
}

export default ContenedorLetrasFake;