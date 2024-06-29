const $contains = document.querySelector('#contains'),
    $howMuchContains = document.querySelector('#howMuchContains'),
    $searchForm = document.querySelector('#searchForm');

$contains.addEventListener('click', e=>{
    if (e.target.checked) {
        $howMuchContains.disabled = false;
        console.log($contains.value)
    } else {
        $howMuchContains.disabled = true;
        $howMuchContains.value = null;
    }
})