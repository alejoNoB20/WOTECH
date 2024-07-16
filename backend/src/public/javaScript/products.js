const $searchType = document.querySelector('#search_type'),
    $searchValue = document.querySelector('#search_value'),
    $input = document.querySelector('#input');

let tools = null,
    stocks = null,
    options = false,
    childEnable = true;

window.addEventListener('DOMContentLoaded', e =>{
    fetch('/products/all', {method: 'GET', headers: {'Content-Type': 'application/json'}})
        .then(data => data.json())
            .then(data => saveData(data))
                .catch(err => console.log(err));
})

const saveData = (data) => {
    tools = data.tools;
    stocks = data.stocks;
}

$searchType.addEventListener('change', e =>{
    const parent = $input;
    const child = $searchValue;
    if(e.target.value === 'id_tool'){
        if (options) {
            const childSelect = document.querySelector('#search_value_select');
            parent.removeChild(childSelect);
        }
        if (childEnable) parent.removeChild(child);
        const select = document.createElement('select');
        select.classList = 'form-select col';
        select.id = 'search_value_select';
        select.name = 'search_value';
            tools.forEach(tool => {
                const option = document.createElement('option');
                option.value = tool.id_tool;
                option.textContent = tool.name_tool;
                select.appendChild(option);
            })
        parent.appendChild(select)
        options = true;
        childEnable = false;      
    }else if (e.target.value === 'id_material'){
        if (options) {
            const childSelect = document.querySelector('#search_value_select');
            parent.removeChild(childSelect);
        }
        if (childEnable) parent.removeChild(child);
        const select = document.createElement('select');
        select.classList = 'form-select col';
        select.id = 'search_value_select';
        select.name = 'search_value';
        stocks.forEach(stock => {
            const option = document.createElement('option');
            option.value = stock.id_material;
            option.textContent = stock.name_material;
            select.appendChild(option);
        })
        parent.appendChild(select) 
        options = true; 
        childEnable = false;      
    }else {
        if (options) {
            const childSelect = document.querySelector('#search_value_select');
            parent.removeChild(childSelect);
            parent.appendChild(child);
            options = false;
            childEnable = true;
        }
    }
})