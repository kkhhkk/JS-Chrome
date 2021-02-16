const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = document.querySelector(".js-toDoInput"),
    toDoList = document.querySelector(".js-toDoList"),
    finishList = document.querySelector(".js-finishList");

const TODOS_LS = "계획";
const FINISHED_LS = "완료"
let toDos = [];
let finished = [];
let toDoNum = 1;
let finishNum = 1;

function saveFinished(){
    localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteList(event){
    const delLi = event.target.parentNode;
    const delUlClassName = delLi.parentNode.className;
    if (delUlClassName === "js-toDoList"){
        toDoList.removeChild(delLi);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(delLi.id)
    })
    toDos = cleanToDos;
    saveToDos();
    }
    if (delUlClassName === "js-finishList"){
        finishList.removeChild(delLi);
        const cleanFinished = finished.filter(function(finish){
            return finish.id !== parseInt(delLi.id)
        })
        finished = cleanFinished;
        saveFinished();
    }
}

function moveList(event){
    const moveLi = event.target.parentNode;
    const moveText = moveLi.firstChild.innerText; 
    const moveUlClassName = moveLi.parentNode.className;
    if (moveUlClassName === "js-toDoList"){
        toDoList.removeChild(moveLi);
    showFinishList(moveText);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(moveLi.id)
    })
    toDos = cleanToDos;
    saveToDos();
    }
    if (moveUlClassName === "js-finishList"){
        finishList.removeChild(moveLi);
    showToDoList(moveText);
    const cleanFinished = finished.filter(function(finish){
        return finish.id !== parseInt(moveLi.id)
    })
    finished = cleanFinished;
    saveFinished();
    }
    
}

function showFinishList(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const backBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = finishNum;
    span.innerText = text;
    delBtn.innerText = "✕";
    delBtn.addEventListener("click", deleteList);
    backBtn.innerText = "↩︎";
    backBtn.addEventListener("click", moveList);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(backBtn);
    li.id = newId;
    finishList.appendChild(li);
    const finishObj = {
        text : text,
        id : newId
    };
    finished.push(finishObj);
    finishNum = finishNum + 1;
    saveFinished();
}


function showToDoList(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const finBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDoNum;
    span.innerText = text;
    delBtn.innerText = "✕";
    delBtn.addEventListener("click", deleteList);
    finBtn.innerText = "✔︎";
    finBtn.addEventListener("click", moveList);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(finBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDosObj = {
        text : text,
        id : newId
    };
    toDos.push(toDosObj);
    toDoNum = toDoNum + 1;
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    showToDoList(currentValue);
    toDoInput.value = "";
}

function init(){
    toDoForm.addEventListener("submit", handleSubmit);
    const loadedToDos = localStorage.getItem(TODOS_LS);
    const loadedFinished = localStorage.getItem(FINISHED_LS);
    const parsedToDos = JSON.parse(loadedToDos);
    const parsedFinished = JSON.parse(loadedFinished);
    if (parsedToDos !== null){
        parsedToDos.forEach(function(toDo){
            showToDoList(toDo.text);
        })
    }
    if (parsedFinished !== null){
        parsedFinished.forEach(function(finish){
            showFinishList(finish.text)
        })
    }
}
init();