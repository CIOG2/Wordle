import LocalStorage from "../utils/LocalStorage.js";

const data = LocalStorage().get('Wordle');

const ButtonMode = () => {
    const label = document.createElement('label');
    label.classList.add('switch');

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'button-mode';
    input.checked = data[0].buttonMode;
    if(data[0].buttonMode === false) {
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
    const datos = LocalStorage().get('Wordle');
    datos[0].buttonMode = !datos[0].buttonMode;
    LocalStorage().set('Wordle', datos)
}

export default ButtonMode;