const searchMaterial = document.querySelector('#searchmaterial'),
    searchValue = document.querySelector('#searchValue'),
    searchButton = document.querySelector('#searchButton');

searchMaterial.addEventListener('input', e=>{
    if (e.target.value.length > 0){
        searchButton.disabled = false;
    } else {
        searchButton.disabled = true;
    }
})

searchValue.addEventListener('change', e=>{
    searchMaterial.value = '';
    searchButton.disabled = true;
})

