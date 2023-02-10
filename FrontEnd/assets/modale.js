
// Recuperation de l'element modale
const modale = document.querySelector('.modale')

// Recuperation de l'element bouton ouvrir modale
const boutonOuvrirModale = document.querySelector('.bouton-switch-edit-mode')

// Recuperation de l'element bouton fermer modale
const boutonFermerModale = document.querySelector('.fa-xmark')

// Ajout d'un event listener sur le bouton ouvrir modale
boutonOuvrirModale.addEventListener('click', () => {
modale.style.display = 'flex'
})

//Ajout d'un event listener sur le bouton fermer modale
boutonFermerModale.addEventListener('click', () => {
modale.style.display = 'none'
})

