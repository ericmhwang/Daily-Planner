// selecting elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// names of classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// variables 
let LIST, id;

// item from local stroage
let data = localStorage.getItem("TODO");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    LIST = [];
    id = 0;
}

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// date
const options = {weekday : "long", month : "long", day : "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});
// to do function
function addToDo(toDo, id, done, trash){
    if(trash) { return };

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
        <i class="fa ${DONE} co" job="complete" id=${id}></i>
        <p class="text ${LINE}"> ${toDo} </p>
        <i class="fa fa-trash-o de" job="delete" id=${id}></i>
    </li>
    `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// input
document.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
        const toDo = input.value;

        // if input is non-empty
        if(toDo){
            addToDo(toDo,id, false, false);
            LIST.push({
                name: toDo,
                id : id,
                done : false,
                trash : false
            });
            // adding item to the list (Added when LIST is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
});

//addToDo("Coffee", 1, false, false);

// complete function
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove function
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// 
list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete") {
        removeToDo(element);
    }
    // adding item to the list (Added when LIST is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});