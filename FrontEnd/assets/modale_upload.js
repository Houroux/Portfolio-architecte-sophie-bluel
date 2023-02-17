let form = document.getElementById('form-id');
let image = document.getElementById('image');
let title = document.getElementById('title');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

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
    .then(console.log)
    .catch(error => console.log(error));
});
