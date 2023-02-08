const loginForm = document.querySelector('.login-form');
const loginButton = document.querySelector('.button-connect');



loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const logins = {
        email: email,
        password: password
    };
    // console.log(logins);
    const promise01 = fetch('http://localhost:5678/api/users/login', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify(logins),
    });
    const responseLogin = promise01.then((response) => {
        return response.json();
    });
    responseLogin.then((data) => {
        if (data.token !== undefined) {
            localStorage.setItem('token', data.token);
            document.location.href="index.html";
        } else {
            alert('Mauvais email ou mot de passe');
        }
     
    });
}
);

