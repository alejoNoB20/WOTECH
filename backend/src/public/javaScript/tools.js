const $statusTool = document.querySelector('#status_tool'),
    $repairDateTool = document.querySelector('#repair_date_tool'),
    $repairShopTool = document.querySelector('#repair_shop_tool'),
    $search_repair_tool = document.querySelector('#search_repair_tool');

$statusTool.addEventListener('change', function(){
    if(this.value === 'En_arreglo'){
        $repairDateTool.disabled = false;
        $repairShopTool.disabled = false;
        $search_repair_tool.disabled = false;
    } else {
        $repairDateTool.value = null;
        $repairShopTool.value = null;
        $search_repair_tool.value = null;
        $repairDateTool.disabled = true;
        $repairShopTool.disabled = true;
        $search_repair_tool.disabled = true;
    }
})
