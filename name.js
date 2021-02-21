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
    printName.innerHTML = ` ${text}, 성공은 어느 한 순간에 얻어지는 것이 아니다. 조금씩의 계획에 의해 완성되는 것이다.`;
    formName.classList.remove(SHOW);
    printName.classList.add(SHOW);
    formName.classList.add("js-hidden")
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