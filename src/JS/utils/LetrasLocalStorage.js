import LocalStorage from "./LocalStorage.js";



const LetrasLocalStorage = (renglon, palabra, checked) => {
    let data = LocalStorage().get('Wordle');
    let palabras = [];

    if (data === null) {
        data = {}
    }

    if(!(data.palabras === undefined)){
        palabras = data.palabras;
    }

    palabras[renglon] = {
        letras: palabra.split(''),
        checked: checked,
    }

    Object.assign(data, {palabras: palabras});
    LocalStorage().set('Wordle', data);
};

export default LetrasLocalStorage;