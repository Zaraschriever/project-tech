//hartje wordt rood bij like


function submitFormulier(){
    document.getElementById('like').addEventListener('submit', clickedLiked);
}

function clickedLiked(){
    document.getElementById('hartje').id='geliked';
}


//honden verwijderen uit lijst

const deleteButton = document.getElementById('verwijder');
const profiel = document.getElementById('match1');

deleteButton.addEventListener('click', verwijder);

function verwijder(){
    profiel.remove();
}

const deleteButtonTwo = document.getElementById('verwijder2');
const profielTwo = document.getElementById('match2');

deleteButtonTwo.addEventListener('click', verwijder2);

function verwijder2(){
    profielTwo.remove();
}

const deleteButtonThree = document.getElementById('verwijder3');
const profielThree = document.getElementById('match3');

deleteButtonThree.addEventListener('click', verwijder3);

function verwijder3(){
    profielThree.remove();
}
