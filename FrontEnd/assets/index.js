// Récupération des works depuis l'API
const reponse = await fetch('http://localhost:5678/api/works/');
const works = await reponse.json();
console.log(works);


// Ajout des works dans le DOM
function genererWorks(works){
    for (const work of works) {
        //Récupération de l'élément du DOM où on va ajouter les works
        const gallery = document.querySelector('.gallery');
//Création de la figure qui va contenir le work
const figure = document.createElement('figure');
//Ajout de la figure dans la gallery
gallery.appendChild(figure);
//Création de l'image dans la figure
const image = document.createElement('img');
//Ajout de l'attribut src à l'image
image.src = work.imageUrl;
//Ajout de l'attribut alt à l'image
image.alt = work.title;
//Ajout de crossorigin à l'image
image.crossOrigin = 'anonymous';
//Ajout de l'image dans la figure
figure.appendChild(image);
//Création de la figcaption qui va être contenue dans la figure
const figcaption = document.createElement('figcaption');
//Ajout de la figcaption dans la balise 
figcaption.innerHTML = work.title;
//Ajout de la figcaption dans la figure
figure.appendChild(figcaption);
    };
};
genererWorks(works);