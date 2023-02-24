// Récupération des works depuis l'API
let reponseWorks = await fetch('http://localhost:5678/api/works/');
let works = await reponseWorks.json();


// Ajout des works dans le DOM
export function genererWorks(works){
      //Récupération de l'élément du DOM où on va ajouter les works
      const gallery = document.querySelector('.gallery');
      gallery.innerHTML = '';
    for (const work of works) {
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




//Ajout fonction bouton tous
const boutonTous = document.querySelector('.tous');
boutonTous.addEventListener('click', () => {
    // console.log('tous');
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    genererWorks(works);
});

//Ajout fonction bouton objets
const boutonObjets = document.querySelector('.objets');
boutonObjets.addEventListener('click', () => {
    const objets = works.filter(work => work.category.name === 'Objets');
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    genererWorks(objets);
});

//Ajout fonction bouton appartements
const boutonAppartements = document.querySelector('.appartements');
boutonAppartements.addEventListener('click', () => {
    const appartements = works.filter(work => work.category.name === 'Appartements');
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    genererWorks(appartements);
});

//Ajout fonction bouton hotels & restaurants
const boutonhotEtRestau = document.querySelector('.hotEtRestau');
boutonhotEtRestau.addEventListener('click', () => {
    const hotEtRestau = works.filter(work => work.category.name === 'Hotels & restaurants');
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    genererWorks(hotEtRestau);
});
