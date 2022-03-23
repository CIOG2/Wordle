import ButtonMode from "./ButtonMode.js";


const Header = () => {
    const headerContent = document.createElement('header')
    headerContent.classList.add('header'); 

    const title = document.createElement('h1');
    title.classList.add('header__title');
    title.textContent = "Wordle"


    headerContent.append( title, ButtonMode())

    return headerContent;
}

export default Header; 