const ButtonMode = () => {
    const label = document.createElement('label');
    label.classList.add('switch');

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'button-mode';
    input.addEventListener('click', () => {
        if (input.checked === false) {
            document.body.style.backgroundColor = '#f5f5f5';
        }else{
            document.body.style.backgroundColor = 'var(--Primer-Color-Oscuro)';
        }        
    })

    const span = document.createElement('span');
    span.classList.add('slider');
    
    label.append(input, span);

    return label;
}

export default ButtonMode;