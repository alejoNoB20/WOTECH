const $searchType = document.querySelector('#search_type');
const $searchButton = document.querySelector('#searchButton');    

let select = false;


const parent = document.querySelector('#div_search_value');
const element = document.createElement('input');
element.type = 'text';
element.id = 'search_value';
element.name = 'search_value';
element.className = 'form-input col'
const newElement = document.createElement('select');
newElement.className = 'form-select col';
newElement.name = 'search_value';
newElement.id = 'search_value_select';
newElement.innerHTML = '<option value="Consumidor Final" selected>Consumidor Final</option>';
newElement.innerHTML += '<option value="Empresa">Empresa</option>';
newElement.innerHTML += '<option value="Otro">Otro</option>';

document.querySelector('#search_value').addEventListener('input', e=> {
    if (e.target.value.length > 0){
        $searchButton.disabled = false;
    } else {
        $searchButton.disabled = true;
    }
})
    
$searchType.addEventListener('change', e=> {
    const child = document.querySelector('#search_value');
    const newChild = document.querySelector('#search_value_select');
    if (e.target.value === 'type_client'){
        if (!select) {
            parent.removeChild(child);
        }
        $searchButton.disabled = false;
        parent.appendChild(newElement);
        select = true;
    } else {
        if (select) {
            parent.removeChild(newChild);
            select = false;
            parent.appendChild(element);
        }
        $searchButton.disabled = true;
        child.value = '';
    }
})