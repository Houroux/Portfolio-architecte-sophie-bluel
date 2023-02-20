import { genererWorks } from "./index.js";
import { genererWorksModale } from "./modale.js";


let form = document.getElementById('form-id');
let image = document.getElementById('image');
let title = document.getElementById('title');
let category = document.getElementById('category');
let submit = document.getElementById('submit');


// Changement couleur bouton submit si formulaire rempli
image.addEventListener('change', () => {
if (image.value !== '' && title.value !== '' && category.value !== '') {
    submit.style.background = '#1D6154';
}
});

title.addEventListener('change', () => {
    if (image.value !== '' && title.value !== '' && category.value !== '') {
        submit.style.background = '#1D6154';
    }
    });

category.addEventListener('change', () => {
    if (image.value !== '' && title.value !== '' && category.value !== '') {
        submit.style.background = '#1D6154';
    }
});



// Apercu photo avant upload
image.addEventListener('change', () => {
    let file = image.files[0];
    document.querySelector('.container-upload-photo').style.background = 'center / contain no-repeat url(' + URL.createObjectURL(file) + ')';

    document.querySelector('.fa-image').style.display = 'none';
    document.querySelector('.label-photo').style.display = 'none';
    document.querySelector('.description-upload').style.display = 'none';

});


const rechercheIdCategory = (category) => {
    return fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].name == category) {
                return data[i].id
            }
        }
    })
    .catch(console.error);
}



form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append('image', image.files[0]);

    formData.append('title', title.value);

    let categoryID = await rechercheIdCategory(category.value); 

    formData.append('category', categoryID);

    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }

    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(console.error);
    if (reponse.status == 201) {      
        // Rechargement dynamique de la page
        let reponseWorks = await fetch('http://localhost:5678/api/works/');
        let works = await reponseWorks.json();
        genererWorks(works);
        genererWorksModale(works);
    }
    else {
        alert('Erreur');
    }
   
   
});
