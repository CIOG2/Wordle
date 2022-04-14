const NumerosAleatorios = (cantidad) => {
    let numerosOrdenados = [];
    let NumerosAleatorios = [];
    
    for (let i = 0; i < cantidad; i++) {
        numerosOrdenados.push(i);
    }
    
    for (let i = 0; i < cantidad; i++) {
        const numeroAleatorio = Math.floor(Math.random() * numerosOrdenados.length);
        NumerosAleatorios.push(numerosOrdenados[numeroAleatorio]);
        numerosOrdenados.splice(numeroAleatorio, 1);
    }

    return NumerosAleatorios;
}

export default NumerosAleatorios;