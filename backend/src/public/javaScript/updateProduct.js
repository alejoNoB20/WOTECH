const $form = document.querySelector('#form'),
    $idProduct = document.querySelector('.id_product'),
    $nameProduct = document.querySelector('#name_product'),
    $imgProduct = document.querySelector('#img_product'),
    $descriptionProduct = document.querySelector('#description_product'),
    $toolsNeeded = document.querySelector('#tools_needed'), 
    $submitTools = document.querySelector('#submit_tools'),
    $containerDivTools = document.querySelector('#container_div_tools'),
    $materialsNeeded = document.querySelector('#materials_needed'),
    $submitMaterials = document.querySelector('#submit_materials'),
    $containerDivMaterials = document.querySelector('#container_div_materials'),
    $howMuchContains = document.querySelector('#how_much_contains'),
    $submitForm = document.querySelector('#submit_form');

window.addEventListener('DOMContentLoaded', e=> {
    const positionsMaterials = Array.from($materialsNeeded).map((option, index) => {
        return $materialsNeeded.options[index].value
    })
    const buttonDeleteMaterials = Array.from(document.querySelectorAll('.material_button')).map(button =>{
        return button
    })
    buttonDeleteMaterials.forEach(button =>{
        if(positionsMaterials.includes(button.id)){
            const selectedOption = $materialsNeeded.options[positionsMaterials.indexOf(button.id)]
            button.onclick = () => deleteMaterial(selectedOption)
        }
    })


    const positionsTools = Array.from($toolsNeeded).map((option, index) => {
        return $toolsNeeded.options[index].value
    })
    const buttonDeleteTools = Array.from(document.querySelectorAll('.tool_button')).map(button =>{
        return button
    })
    buttonDeleteTools.forEach(button =>{
        if(positionsTools.includes(button.id)){
            const selectedOption = $toolsNeeded.options[positionsTools.indexOf(button.id)]
            button.onclick = () => deleteTool(selectedOption)
        }
    })
})

enableSubmitButton();

$toolsNeeded.addEventListener('change', e => {
    enableSubmitButton();
})

$materialsNeeded.addEventListener('change', e => {
    enableSubmitButton();
})

$submitTools.addEventListener('click', e=> {
    let selectOption = $toolsNeeded.options[$toolsNeeded.selectedIndex];
    let nameTool = selectOption.textContent;

    const divRow = document.createElement('div');
    divRow.className = 'row my-3';
    divRow.id = `tool-div-${selectOption.value}`;
    $containerDivTools.appendChild(divRow);

    const listItemID = document.createElement('li');
    listItemID.className = 'list-group-item col fs-5 tools';
    listItemID.id = selectOption.value;
    listItemID.textContent = `- ${nameTool}`; 
    divRow.appendChild(listItemID);
    selectOption.disabled = true;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn btn-danger mx-5 col-1 fs-5';
    deleteButton.id = selectOption.value;
    deleteButton.onclick = () => deleteTool(selectOption);
    deleteButton.textContent = '-';
    divRow.appendChild(deleteButton);

    $toolsNeeded.value = 'selected'
    enableSubmitButton();
})

$submitMaterials.addEventListener('click', e=> {
    let selectOption = $materialsNeeded.options[$materialsNeeded.selectedIndex];
    let nameMaterial = selectOption.textContent;

    const divRow = document.createElement('div');
    divRow.className = 'row my-3';
    divRow.id = `material-div-${selectOption.value}`;
    $containerDivMaterials.appendChild(divRow);

    const listItemID = document.createElement('li');
    listItemID.className = 'list-group-item col fs-5 materials';
    listItemID.id = selectOption.value;
    listItemID.textContent = `- ${nameMaterial}`; 
    divRow.appendChild(listItemID);
    selectOption.disabled = true;

    const listItemCant = document.createElement('li');
    listItemCant.className = 'list-group-item col fs-5 materials_cant';
    listItemCant.id = $howMuchContains.value;
    listItemCant.textContent = `(${$howMuchContains.value})`
    divRow.appendChild(listItemCant);
    
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn btn-danger mx-5 col-1 fs-5';
    deleteButton.id = selectOption.value;
    deleteButton.onclick = () => deleteMaterial(selectOption);
    deleteButton.textContent = '-';
    divRow.appendChild(deleteButton);

    $materialsNeeded.value = 'selected';
    $howMuchContains.value = null;
    enableSubmitButton();
})

$submitForm.addEventListener('click', e => {
    
    e.preventDefault();

    const $allChoosedTools = document.querySelectorAll('.tools'),
        $allChoosedMaterials = document.querySelectorAll('.materials'),
        $allCantMaterials = document.querySelectorAll('.materials_cant')
    
    let ChoosendToolsID = [];
    $allChoosedTools.forEach(tool => {
        ChoosendToolsID.push(parseInt(tool.id))
    })
    let ChoosedMaterials = [];

    $allChoosedMaterials.forEach(material => {
        ChoosedMaterials.push({"id": parseInt(material.id)});
    })

    ChoosedMaterials.forEach((material, index) => {
        material.how_much_content = parseInt($allCantMaterials[index].id);
    })

    let newData = {
        'name_product': $nameProduct.value,
        'img_product': $imgProduct.value,
        'description_product': $descriptionProduct.value,
        'tools': ChoosendToolsID,
        'materials': ChoosedMaterials
    };
    
    sendData(newData);
})

function deleteTool(option) {
    const parent = document.querySelector('#container_div_tools');
    const child = document.querySelector(`#tool-div-${option.value}`);
    parent.removeChild(child);
    option.disabled = false;    
}

function deleteMaterial(option) {
    const parent = document.querySelector('#container_div_materials');
    const child = document.querySelector(`#material-div-${option.value}`);
    parent.removeChild(child);
    option.disabled = false;
}

function enableSubmitButton() {
    const $allChoosedTools = document.querySelectorAll('.tools'),
        $allChoosedMaterials = document.querySelectorAll('.materials')

    const ChoosendToolsID = Array.from($allChoosedTools).map(tool => {
        return tool.id;
    })

    Array.from($toolsNeeded).forEach(option => {
        if(ChoosendToolsID.includes(option.value)){
            option.disabled = true;
        }   
    })

    const ChoosendMaterialsID = Array.from($allChoosedMaterials).map(material => {
        return material.id;
    })

    Array.from($materialsNeeded).forEach(option => {
        if(ChoosendMaterialsID.includes(option.value)){
            option.disabled = true;
        }
    })
    
    if ($toolsNeeded.value === 'selected'){
        $submitTools.disabled = true
    } else {
        $submitTools.disabled = false;
    }
    if ($materialsNeeded.value === 'selected') {
        $submitMaterials.disabled = true; 
        $howMuchContains.disabled = true;
    } else {
        $submitMaterials.disabled = false;
        $howMuchContains.disabled = false;
    }
}

function sendData(newData) {
    fetch(`/products/update/${$idProduct.id}`, {method: 'POST', body: JSON.stringify(newData), headers: {'Content-Type': 'application/json'}})
        .then(()=>{window.location.href = '/products';})
            .catch(() => {res.status(400).render('error', {error: 'El error no se pudo manejar correctamente', redirect: '/', text: 'Volver al inicio'});})
}

