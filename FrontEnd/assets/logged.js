const baliseLogin = document.querySelector('.balise-login');
const header = document.querySelector('header');
const modeEditeurHeader = document.querySelector('.mode-editeur-header');


if (localStorage.getItem('token')) {
    baliseLogin.innerHTML = 'logout';
    header.style.margin = '80px 0 50px 0';
    modeEditeurHeader.style.display = 'flex';
} else {
    baliseLogin.innerHTML = 'login';
    header.style.margin = '50px 0 50px 0';
    modeEditeurHeader.style.display = 'none';
}



baliseLogin.addEventListener('click', () => {
    if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
    }});