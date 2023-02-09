const baliseLogin = document.querySelector('.balise-login');
const header = document.querySelector('header');
const modeEditeurHeader = document.querySelector('.mode-editeur-header');


// A APPLIQUER EN MODE EDITION
// header.style.margin = '80px 0 50px 0';
// modeEditeurHeader.style.display = 'flex';
// 
// header.style.margin = '50px 0 50px 0';
// modeEditeurHeader.style.display = 'none';



if (localStorage.getItem('token')) {
    baliseLogin.innerHTML = 'logout';
} else {
    baliseLogin.innerHTML = 'login';
}



baliseLogin.addEventListener('click', () => {
    if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
    }});