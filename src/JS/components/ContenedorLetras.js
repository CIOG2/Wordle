const ContenedorLetras = (palabra) => {
    
    const contenedorCuadros = [];

    for (let i = 0; i < 6; i++) {
        const contenedor = document.createElement('div');
        contenedor.classList.add('letras__contenedor');
        contenedor.id = `contenedor${i}`;

        for (let j = 0; j < palabra.length; j++) {
            const cuadro = document.createElement('div');
            cuadro.classList.add('letras__cuadro');
            contenedor.appendChild(cuadro);
        }

        contenedorCuadros.push(contenedor);
    }

    const contenedorPrincipal = document.createElement('div');
    contenedorPrincipal.classList.add('contenedor__Principal');
    contenedorPrincipal.append(...contenedorCuadros);

    return contenedorPrincipal;
}

export default ContenedorLetras;