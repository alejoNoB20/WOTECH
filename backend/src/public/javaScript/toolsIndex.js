const $searchValue = document.querySelector('#searchValue'),
    $statusOptions = document.querySelector('#status_options');
    
$searchValue.addEventListener('change', function(){
    if (this.value === 'status_tool'){
        $statusOptions.innerHTML = 
            `<ol class="list-group list-group-numbered">
                <label class="form-label fs-3">Para elegir el estado debes colocar:</label>
                <li class="list-group-item"> "Habilitado"</li>
                <li class="list-group-item"> "En arreglo"</li>
                <li class="list-group-item"> "Perdido"</li>
            </ol>`;
    } else {
        $statusOptions.innerHTML = '';
    }
})
