import { genererWorks } from "./index.js";



// Recuperation de l'element modale
const modale = document.querySelector('.modale')

// Recuperation de l'element bouton ouvrir modale
const boutonOuvrirModale = document.querySelector('.bouton-switch-edit-mode')

// Recuperation de l'element bouton fermer modale
let boutonFermerModale = document.querySelector('.fa-xmark')

// Ajout d'un event listener sur le bouton ouvrir modale
boutonOuvrirModale.addEventListener('click', () => {
modale.style.display = 'flex'
document.querySelector('.modale-ajout-photo-container').style.display = 'none'
document.querySelector('.modale-container').style.display = 'flex'
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


// Récupération des works depuis l'API
let reponseWorks = await fetch('http://localhost:5678/api/works/');
let works = await reponseWorks.json();

// Ajout des photos dans la modale
export function genererWorksModale(works){
    for (const work of works) {
        //Récupération de l'élément de la modale où on va ajouter les works
        const galleryModale = document.querySelector('.edit-work-container');
        //Création de la div qui va contenir le work
        const workModale = document.createElement('div');
        workModale.classList.add('edit-work');
        //Ajout de la div dans la modale
        galleryModale.appendChild(workModale);
        //Création de l'image dans la div
        const image = document.createElement('img');
        //Ajout de l'attribut src à l'image
        image.src = work.imageUrl;
        //Ajout de l'attribut alt à l'image
        image.alt = work.title;
        //Ajout de crossorigin à l'image
        image.crossOrigin = 'anonymous';
        //Ajout de l'image dans la div
        workModale.appendChild(image);
        //Création du bouton editer
        const boutonEditer = document.createElement('p');
        boutonEditer.innerHTML = 'éditer';
        workModale.appendChild(boutonEditer);

        const divIconsContainer = document.createElement('div');
        divIconsContainer.classList.add('container-container-icons');
        workModale.appendChild(divIconsContainer);

        const divIconCross = document.createElement('div');
        divIconCross.classList.add('container-icons');
        divIconCross.classList.add('container-cross');
        divIconsContainer.appendChild(divIconCross);

        const iconCross = document.createElement('i');
        iconCross.classList.add('fa-solid');
        iconCross.classList.add('fa-xs');
        iconCross.classList.add('fa-up-down-left-right');
        divIconCross.appendChild(iconCross);

        
        const divIconTrash = document.createElement('div');
        divIconTrash.classList.add('container-icons');
        divIconTrash.classList.add('container-trash');
        divIconTrash.setAttribute('id', work.id);
        divIconsContainer.appendChild(divIconTrash);

        const iconTrash = document.createElement('i');
        iconTrash.classList.add('fa-solid');
        iconTrash.classList.add('fa-xs');
        iconTrash.classList.add('fa-trash-can');
        divIconTrash.appendChild(iconTrash);
    };
};
genererWorksModale(works);

        






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


//Ajout focntionnalite bouton supprimer
const boutonSupprimer = document.querySelectorAll('.container-trash')
for (const bouton of boutonSupprimer) {
    bouton.addEventListener('click', async () => {
        const id = bouton.getAttribute('id')
        fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(console.log(response))
        .catch(error => console.log(error))

        // Rechargement dynamique de la page
        let reponseWorks = await fetch('http://localhost:5678/api/works/');
        let works = await reponseWorks.json();       
        genererWorks(works);
        genererWorksModale(works);
    
    })
}


//Ajout fonctionnalite bouton tout supprimer 
 const boutonToutSupprimer = document.querySelector('.edit-supp')
boutonToutSupprimer.addEventListener('click', async () => {
    for (const work of works) {
        let id = work.id
        fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    }
    // Rechargement dynamique de la page
    let reponseWorks = await fetch('http://localhost:5678/api/works/');
    let works = await reponseWorks.json();
    genererWorks(works);
    genererWorksModale(works);
    
    
})