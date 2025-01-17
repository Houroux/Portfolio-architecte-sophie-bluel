const baliseLogin = document.querySelector('.balise-login');
const header = document.querySelector('header');
const modeEditeurHeader = document.querySelector('.mode-editeur-header');

//Si le token existe, on affiche les boutons correspondants sinon on affiche les boutons du mode visiteur
if (localStorage.getItem('token')) {
    baliseLogin.innerHTML = 'logout';
    document.querySelector('.bouton-switch-edit-mode').style.display = 'inline-flex';
    header.style.margin = '110px 0px 50px 0px';
    modeEditeurHeader.style.display = 'flex';
} else {
    baliseLogin.innerHTML = 'login';
    document.querySelector('.bouton-switch-edit-mode').style.display = 'none';
    header.style.margin = '50px 0px 50px 0px';
    modeEditeurHeader.style.display = 'none';
}

//Suppression du token lors du clique sur logout
baliseLogin.addEventListener('click', () => {
    if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
    }});