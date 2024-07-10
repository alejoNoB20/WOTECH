const $form = document.querySelector('#form'),
    $nameProduct = document.querySelector('#name_product'),
    $imgProduct = document.querySelector('#img_product'),
    $descriptionProduct = document.querySelector('#description_product'),
    $choosenTools = document.querySelector('#choseen_tools'),
    $choosenMaterials = document.querySelector('#choosen_materials'),
    $toolsNeeded = document.querySelector('#tools_needed'),
    $materialsNeeded = document.querySelector('#materials_needed'),
    $howMuchContains = document.querySelector('#how_much_contains'),
    $submitTools = document.querySelector('#submit_tools'),
    $submitMaterials = document.querySelector('#submit_materials'),
    $containerDivTools = document.querySelector('#container_div_tools'),
    $containerDivMaterials = document.querySelector('#container_div_materials'),
    $submitForm = document.querySelector('#submit_form');

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
        divRow.id = `div-${selectOption.value}`;
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
        deleteButton.onclick = () => deleteTool(selectOption.value);
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
        divRow.id = `div-${selectOption.value}`;
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
        deleteButton.onclick = () => deleteMaterial(selectOption.value);
        deleteButton.textContent = '-';
        divRow.appendChild(deleteButton);

        $materialsNeeded.value = 'selected';
        $howMuchContains.value = null;
        enableSubmitButton();
})

$submitForm.addEventListener('click', e => {
    e.preventDefault();

    let ChoosendToolsID = [];
    const $allChoosedTools = document.querySelectorAll('.tools'); 
    $allChoosedTools.forEach(tool => {
        ChoosendToolsID.push(parseInt(tool.id))
    })

    let ChoosedMaterials = [];

    const $allChoosedMaterials = document.querySelectorAll('.materials');    
    const $allCantMaterials = document.querySelectorAll('.materials_cant')

    $allChoosedMaterials.forEach(material => {
        ChoosedMaterials.push({"id": parseInt(material.id)});
    })

    ChoosedMaterials.forEach((material, index) => {
        material.how_much_content = parseInt($allCantMaterials[index].id);
    })

    let newData = JSON.stringify({
        'name_product': $nameProduct.value,
        'img_product': $imgProduct.value,
        'description_product': $descriptionProduct.value,
        'tools': ChoosendToolsID,
        'materials': ChoosedMaterials
    });

    sendData(newData);
})

function deleteTool(id) {
    const parent = document.querySelector('#container_div_tools');
    const child = document.querySelector(`#div-${id}`);
    parent.removeChild(child);
    $toolsNeeded.options[id].disabled = false;
}

function deleteMaterial(id) {
    const parent = document.querySelector('#container_div_materials');
    const child = document.querySelector(`#div-${id}`);
    parent.removeChild(child);
    $materialsNeeded.options[id].disabled = false;
}

function enableSubmitButton() {
    ($toolsNeeded.value === 'selected') ? $submitTools.disabled = true : $submitTools.disabled = false;
    if ($materialsNeeded.value === 'selected') {
        $submitMaterials.disabled = true; 
        $howMuchContains.disabled = true;
    } else {
        $submitMaterials.disabled = false;
        $howMuchContains.disabled = false;
    }
    
}

function sendData(newData) {
    fetch('/products/create', {method: 'POST', body: newData})
        .catch(() => {            
        res.status(400).render('error', {error: 'El error no se pudo manejar correctamente', redirect: '/', text: 'Volver al inicio'});
    })
}

