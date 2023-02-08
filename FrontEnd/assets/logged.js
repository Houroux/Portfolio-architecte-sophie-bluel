const baliseLogin = document.querySelector('.balise-login');


if (localStorage.getItem('token')) {
    baliseLogin.innerHTML = 'logout';
} else {
    baliseLogin.innerHTML = 'login';
}


baliseLogin.addEventListener('click', () => {
    if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
    }});