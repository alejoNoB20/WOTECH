const input = document.createElement('input');
input.type = 'text';
input.id = 'inputProduct';
input.name = 'searchProduct';
input.className = 'form-control';

const select = document.createElement('select');
select.id = 'selectProduct';
select.name = 'searchProduct';
select.className = 'form-select col';
select .innerHTML = `
        <option value="Habilitado" selected>Habilitado</option>
        <option value="En Arreglo">En Arreglo</option>
        <option value="Perdido">Perdido</option>    
`

const $searchValue = document.querySelector('#searchValue'),
    $searchButton = document.querySelector('#searchButton'),
    $searchProduct = document.querySelector('#inputProduct');

let isInput = true;

$searchProduct.addEventListener('input', e=>{
    if(e.target.value.length > 0) {
        $searchButton.disabled = false;
    } else {
        $searchButton.disabled = true;
    }
})

$searchValue.addEventListener('change', e=>{
    const parent = document.querySelector('#div-product'),
        inputchild = document.querySelector('#inputProduct'),
        selectChild = document.querySelector('#selectProduct');

    if(e.target.value === 'status_tool'){
            parent.removeChild(inputchild);
            parent.appendChild(select);
            $searchButton.disabled = false;
            isInput = false;
    } else {
        if (!isInput){
            parent.removeChild(selectChild);
            parent.appendChild(input);
            $searchButton.disabled = true;
            isInput = true;
        } else {
            $searchButton.disabled = true;
            inputchild.value = '';
        }
    }
})
