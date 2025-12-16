const dateElement = document.querySelector(".current-date");
const itemContainer = document.querySelector(".item-container");
const emptyContainer = document.querySelector(".empty-hidden-container");
let taskInput = document.getElementById("taskInput");
let itemLeftElement = document.getElementById("item-left-label");
const filters = document.querySelectorAll(".filter");
let allTask = [];
let activeTask = [];
let completedTask = [];
let currentfilter="all"; 

window.addEventListener("load",()=>{
    updateDateAndDay();
    loadFromLocalStorage();
});

function updateDateAndDay(){

    const options = {
        weekday : "long",
        month : "long",
        day : "numeric"
    };

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", options);

    dateElement.textContent = formattedDate;
}

function addTask(){

    if(taskInput.value === ""){
        return;
    }

    allTask.push({
        text : taskInput.value,
        completed:false
    });
    
    taskInput.value = "";
    
    saveToLocalStorage();
    renderTask(currentfilter);
    updateItemLeft();

}


function renderTask(type){
    switch(type){
        case "active":
            activeTask = allTask.filter(t => !t.completed);
            fillUI(activeTask);
            break;

        case "completed":
            completedTask = allTask.filter(t => t.completed);
            fillUI(completedTask);
            break;

        default:
            fillUI(allTask);
    }
    updateEmptyMessage();
}

function fillUI(tasks){
    itemContainer.innerHTML = "";

    tasks.forEach((task,index)=>{
        let listElement = document.createElement("li");
        listElement.classList.add("list");
        
        let divElement  = document.createElement("div");
        divElement.classList.add("item");
        
        divElement.innerHTML = `
        <div class="left">
        <input type="checkbox" ${task.completed ? "checked" : ""}
        onchange="toggleTask(${index})">
        <span class="${task.completed ? "completed" : ""}">${task.text}</span>
        </div>
        <button class="deletebutton" onclick="deleteTask(event)">x</button>
        `;
        
        listElement.appendChild(divElement);
        itemContainer.prepend(listElement);
    });
}


function toggleTask(index){
    allTask[index].completed = !allTask[index].completed;
    
    saveToLocalStorage();
    renderTask(getCurrentFilter());
    updateItemLeft();
}

filters.forEach(f =>{
    f.addEventListener("click", ()=>{
        filters.forEach(fi => fi.classList.remove("active"));

        f.classList.add("active");

        currentfilter = f.textContent.toLowerCase();

        renderTask(currentfilter);
        updateItemLeft();
    })
});

function getCurrentFilter(){
    return currentfilter;
}

function updateItemLeft(){
    
    let count = 0;
    
    switch(currentfilter){
        case "active":
            count = allTask.filter(t => !t.completed).length;
            itemLeftElement.textContent = count + " active items";
            break;

        case "completed":
            count = allTask.filter(t => t.completed).length;
            itemLeftElement.textContent = count + " completed items";
            break;
            
            default:
                count = allTask.filter(t => !t.completed).length;
                itemLeftElement.textContent = count + " items left";
    }
}

function updateEmptyMessage(){
    if(itemContainer.children.length > 0){
        emptyContainer.style.display = "none";
    }
    else{
        emptyContainer.style.display = "flex";
    }
}

function deleteTask(index){
    allTask.splice(index,1);

    saveToLocalStorage();
    renderTask(allTask);
    updateItemLeft();
}

function clearCompletedTask(){
    allTask = allTask.filter(task => !task.completed);

    saveToLocalStorage();
    renderTask(currentfilter);
    updateItemLeft();
}

function saveToLocalStorage(){
    localStorage.setItem("tasks",JSON.stringify(allTask));
}

function loadFromLocalStorage(){
    const storedTask = localStorage.getItem("tasks");
    
    if(storedTask){
        allTask = JSON.parse(storedTask);
        renderTask(currentfilter);
        updateItemLeft();
    }
}














