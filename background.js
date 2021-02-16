const body = document.querySelector("body");

const IMG_NUMBER = 3;

function showBackground(randomNumber){
    const img = new Image();
    img.src = `images/${randomNumber}.jpg`;
    img.classList.add("backgroundImg");
    body.prepend(img);
}

function genRandom(){
    const randomNum = Math.random()*IMG_NUMBER + 1;
    return Math.floor(randomNum);
}


function init(){
    const randomNumber = genRandom();
    showBackground(randomNumber);
}

init();