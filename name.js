const formName = document.querySelector(".js-formName"),
    nameInput = formName.querySelector("input"),
    printName = document.querySelector(".js-showName");

const SHOW = "showing";
const USER_LS = "username"

function saveName(text){
    localStorage.setItem(USER_LS, text);
}


function askForName(){
    formName.classList.add(SHOW);
    printName.classList.remove(SHOW);
    formName.addEventListener("submit", handleSubmit)
}

function showName(text){
    printName.innerHTML = `Hello ${text}`;
    formName.classList.remove(SHOW);
    printName.classList.add(SHOW);
    saveName(text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = nameInput.value;
    showName(currentValue);
    nameInput.value = "";
}

function init(){
    const loadedUserName = localStorage.getItem(USER_LS);
    if (loadedUserName === null){
        askForName();
    }else{
        showName(loadedUserName);
    }
}

init();