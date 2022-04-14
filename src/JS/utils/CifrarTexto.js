const CifrarTexto = () => {
    const cifrar = (texto) => {
        let textoCifrado = '';
        for (let i = 0; i < texto.length; i++) {
        textoCifrado += String.fromCharCode(texto.charCodeAt(i) + 5);
        }
        return textoCifrado;
    };
    
    const descifrar = (texto) => {
        let textoDescifrado = '';
        for (let i = 0; i < texto.length; i++) {
        textoDescifrado += String.fromCharCode(texto.charCodeAt(i) - 5);
        }
        return textoDescifrado;
    };
    
    return {
        cifrar,
        descifrar,
    };    
};