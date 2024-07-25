const div_repairShop = document.createElement('div');
div_repairShop.className = 'mb-3';
div_repairShop.innerHTML = `
    <label for="repair_shop_tool" class="form-label">Donde se está arreglando</label>
    <input type="text" class="form-control" id="repair_shop_tool" name="repair_shop_tool">
`;

const div_repairDate = document.createElement('div');
div_repairDate.className = 'mb-3';
div_repairDate.innerHTML = `
    <label for="repair_date_tool" class="form-label">Cuando se llevo a reparar</label>
    <input type="date" class="form-control" id="repair_date_tool" name="repair_date_tool">
`;

const div_searchRepair = document.createElement('div');
div_searchRepair.className = 'mb-3';
div_searchRepair.innerHTML = `
    <label for="search_repair_tool" class="form-label">Cuando ir a buscar</label>
    <input type="date" class="form-control" id="search_repair_tool" name="search_repair_tool">
`;

const $idTool = document.querySelector('.id_tool'),
    $nameTool = document.querySelector('#name_tool'),
    $descriptionTool = document.querySelector('#description_tool'),
    $statusTool = document.querySelector('#status_tool'),
    $divArreglo = document.querySelector('#div_arreglo'),
    $locationTool = document.querySelector('#location_tool'),
    $updateForm = document.querySelector('#update_form');

let toolData = null;
let enArreglo = null;

window.addEventListener('DOMContentLoaded', async e=> {
    await fetch(`/tools/getTool/${$idTool.id}`, {method: 'GET', headers: {'Content-Type': 'application/json'}})
        .then(data => data.json())
            .then(data => {saveData(data); isRepair(data)})
                .catch(err => console.log(err));
    console.log(toolData)
})

$statusTool.addEventListener('change', e=> {
    if(e.target.value === 'En Arreglo'){
        $divArreglo.appendChild(div_repairShop)
        $divArreglo.appendChild(div_repairDate);
        $divArreglo.appendChild(div_searchRepair);
        enArreglo = true;
    }else {
        if(enArreglo){
            $divArreglo.removeChild(div_repairShop)
            $divArreglo.removeChild(div_repairDate);
            $divArreglo.removeChild(div_searchRepair);
            enArreglo = false;
        }
    }
})

$updateForm.addEventListener('submit', e=>{
    e.preventDefault();

    const $repairShopTool = document.querySelector('#repair_shop_tool'),
        $repairDateTool = document.querySelector('#repair_date_tool'),
        $searchRepairTool = document.querySelector('#search_repair_tool');

    let enableTool = null;

    ($statusTool.value !== 'Habilitado') ? enableTool = false : enableTool = true;

    const newData = {
        name_tool: $nameTool.value,
        description_tool: $descriptionTool.value,
        status_tool: $statusTool.value,
        repair_shop_tool: $repairShopTool?.value ?? null,
        repair_date_tool: $repairDateTool?.value ?? null,
        search_repair_tool: $searchRepairTool?.value ?? null,
        location_tool: $locationTool.value,
        enable_tool: enableTool
    }

    fetch(`/tools/update/${$idTool.id}`, {method: 'POST', body: JSON.stringify(newData), headers: {'Content-Type': 'application/json'}})
        .then(()=> {window.location.href = '/tools'})
            .catch(err => console.log(err))
})

function saveData(data){
    toolData = data;
}

function isRepair(toolData){
    
    if(toolData.status_tool === 'En Arreglo'){
        $divArreglo.appendChild(div_repairShop);
        $divArreglo.appendChild(div_repairDate);
        $divArreglo.appendChild(div_searchRepair);

        const $repairShopTool = document.querySelector('#repair_shop_tool'),
            $repairDateTool = document.querySelector('#repair_date_tool'),
            $searchRepairTool = document.querySelector('#search_repair_tool');

        $repairShopTool.value = toolData.repair_shop_tool;
        $repairDateTool.value = toolData.repair_date_tool;
        $searchRepairTool.value = toolData.search_repair_tool;

        enArreglo = true;
    }else {
        enArreglo = false;
    }  
}