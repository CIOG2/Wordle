import ButtonMode from "./ButtonMode.js";


const Header = () => {
    const headerContainer = document.createElement('header')
    headerContainer.classList.add('header'); 

    const title = document.createElement('h1');
    title.classList.add('header__title');
    title.textContent = "Wordle"


    headerContainer.append( title, ButtonMode())

    return headerContainer;
}

export default Header; 