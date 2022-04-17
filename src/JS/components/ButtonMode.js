import LocalStorage from "../utils/LocalStorage.js";

const data = LocalStorage().get('Wordle');

const ButtonMode = () => {
    const label = document.createElement('label');
    label.textContent = 'Modo Boton';
    label.classList.add('switch');

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'button-mode';
    if (data === null) {
        input.checked = false;
    } else {
        input.checked = data.buttonMode;
    }
    if((data === null || data.buttonMode === undefined) || data.buttonMode === false) {
        document.body.style.backgroundColor = '#f5f5f5';
    }else{
        document.body.style.backgroundColor = 'var(--Primer-Color-Oscuro)';
    }        
    input.addEventListener('click', () => {
        if (input.checked === false) {
            document.body.style.backgroundColor = '#f5f5f5';
            cambiarModo();      
        }else{
            document.body.style.backgroundColor = 'var(--Primer-Color-Oscuro)';
            cambiarModo();
        }        
    })

    const span = document.createElement('span');
    span.classList.add('slider');
    
    label.append(input, span);

    return label;
}


function cambiarModo() {
    let datos = LocalStorage().get('Wordle');
    if (datos === null) {
        datos = {
            buttonMode: true
        };
        LocalStorage().set('Wordle', datos)
    } else {
        datos.buttonMode = !datos.buttonMode;
        LocalStorage().set('Wordle', datos)
    }
}

export default ButtonMode;