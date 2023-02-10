
// Recuperation de l'element modale
const modale = document.querySelector('.modale')

// Recuperation de l'element bouton ouvrir modale
const boutonOuvrirModale = document.querySelector('.bouton-switch-edit-mode')

// Recuperation de l'element bouton fermer modale
let boutonFermerModale = document.querySelector('.fa-xmark')

// Ajout d'un event listener sur le bouton ouvrir modale
boutonOuvrirModale.addEventListener('click', () => {
modale.style.display = 'flex'
})

//Ajout d'un event listener sur le bouton fermer modale
boutonFermerModale.addEventListener('click', () => {
modale.style.display = 'none'
})


// Ajout d'un event listener sur la modale pour fermer la modale si on clique en dehors de la modale
modale.addEventListener('click', function(event) {
      
    if (!event.target.closest('.modale-container' ) & !event.target.closest('.modale-ajout-photo-container')) {

        modale.style.display = 'none'

        }
      });


// Ajout d'un event listener sur la touche escape pour fermer la modale
window.addEventListener('keydown', event => {
    
    if (event.key === 'Escape') {
        modale.style.display = 'none'
    }
});


// Ajout d'un event listener sur le bouton ajouter photo
const boutonAjouterPhoto = document.querySelector('.bouton-ajouter-photo')
boutonAjouterPhoto.addEventListener('click', () => {

    //Recuperation de la modale d'ajout de photo
    const modaleAjoutPhoto = document.querySelector('.modale-ajout-photo-container')
    //Fermeture de la modale principale
    document.querySelector('.modale-container').style.display = 'none'
    //Affichage de la modale d'ajout de photo
    modaleAjoutPhoto.style.display = 'flex'
    //Recuperation du nouveau bouton de fermeture de la modale
    boutonFermerModale = document.querySelector('.bouton-fermer-modale')
    //Ajout d'un event listener sur le bouton fermer modale
    boutonFermerModale.addEventListener('click', () => {
    modale.style.display = 'none'
    })
    //Recuperation du bouton de retour a la modale principale
    const boutonRetourModalePrincipale = document.querySelector('.fa-arrow-left-long')
    //Ajout d'un event listener sur le bouton retour a la modale principale
    boutonRetourModalePrincipale.addEventListener('click', () => {
    document.querySelector('.modale-ajout-photo-container').style.display = 'none'
    document.querySelector('.modale-container').style.display = 'flex'
})})