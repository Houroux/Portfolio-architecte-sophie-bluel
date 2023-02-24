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
       //Récupération de l'élément de la modale où on va ajouter les works
       const galleryModale = document.querySelector('.edit-work-container');
       galleryModale.innerHTML = '';
    for (const work of works) {
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
    //Remise à zéro du formulaire d'ajout de photo
    document.getElementById('form-id').reset()
    document.querySelector('.container-upload-photo').style.background = '#E8F1F7';
    document.querySelector('.fa-image').style.display = 'inline-block';
    document.querySelector('.label-photo').style.display = 'flex';
    document.querySelector('.description-upload').style.display = 'block';
    let image = document.getElementById('image');
    if (image.files && image.files[0]) {
        image.files[0] = null;
    }
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


//Ajout fonctionnalite bouton supprimer
export function fonctionBoutonSupprimer () {
    const boutonSupprimer = document.querySelectorAll('.container-trash')
    boutonSupprimer.forEach(bouton => {
    bouton.addEventListener('click', async () => {
        const id = bouton.getAttribute('id')
        fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(async (response) => {
            if (response.ok) {      
            // Rechargement dynamique de la page
                    let reponseWorks = await fetch('http://localhost:5678/api/works/');
                    let works = await reponseWorks.json();
                    genererWorks(works);
                    genererWorksModale(works);
                    fonctionBoutonSupprimer();
            }
            else {
                alert('Erreur');
            }
          
        })  
    })
})
}
fonctionBoutonSupprimer();

//Ajout fonctionnalite bouton tout supprimer 
 const boutonToutSupprimer = document.querySelector('.edit-supp')
boutonToutSupprimer.addEventListener('click', async () => {
    let reponseWorks = await fetch('http://localhost:5678/api/works/');
    let works = await reponseWorks.json();
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
    const regenererWorks = async () => {
        let reponseWorks = await fetch('http://localhost:5678/api/works/');
        let works = await reponseWorks.json();
        genererWorks(works);
        genererWorksModale(works);
        }
    regenererWorks();
})