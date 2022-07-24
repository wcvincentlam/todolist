//Selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listener
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click",trashOrCheck);
filterOption.addEventListener("click", filterTodo);
//Makes sure local storage is loaded
document.addEventListener("DOMContentLoaded", getTodos);


//Functions
//Adds a todo list item
function addTodo(event) {
    //Prevent submit button from submitting
    event.preventDefault();
    //Create DIV for todo
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list item
    const todoNew = document.createElement("li");
    todoNew.classList.add("todo-item");
    todoNew.innerText = todoInput.value;
    todoDiv.appendChild(todoNew);
    //ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value)
    //Create Complete button -> add class (for css) -> add icon -> append to Div
    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.innerHTML = '<i class = "fas fa-check fa-2x"></i>';
    todoDiv.appendChild(completeButton);
    //Create Trash button
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = '<i class = "fas fa-trash fa-2x"></i>';
    todoDiv.appendChild(trashButton);
    //Append to todo list
    todoList.appendChild(todoDiv)
    //Clears the input value textbox after submit
    todoInput.value = " ";
}

//When clicking on complete or trash button
function trashOrCheck(e){
    const item = e.target;
    //If click on Trash button
    if (item.classList[0] ==='trash-btn') {
        const todo = item.parentElement;
        //Add class to create animation
        todo.classList.add("collapse")
        //Remove item from local storage
        removeLocalTodos(todo);
        //Add event listener to remove class when transition ends
        todo.addEventListener('transitionend',function(){
            todo.remove();
        });
    }
    if (item.classList[0] ==='complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("complete");
        item.classList.toggle("completo")
    }
}

//Filter list by "complete", "incomplete", and "all"
function filterTodo(e) {
    //Selects div todo
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function(todo){
        switch(e.target.value){
            //shows all option values of "all"
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('complete')){
                    todo.style.display = 'flex';
                 } else {
                    todo.style.display = 'none';
                 }
                 break;
            case "incomplete":
                if (!todo.classList.contains('complete')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
    }
});
}

//Saving list items to local storage
function saveLocalTodos(todo){
    //Check - Already have things in there?
    let todos;
    //If local storage doesnt have todos, return an empty array
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    //Set it back to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Get back local todos on-load
function getTodos() {
    //Same as above, but now we copy parts of function "addTodo" to make a loading effect
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //Here we use for each to loop over all the todos in the local storage
    //Copied from above function "addTodo"
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create list item
        const todoNew = document.createElement("li");
        //now innerText should pull todo value
        todoNew.innerText = todo;
        todoNew.classList.add("todo-item");
        todoDiv.appendChild(todoNew);
        //Create Complete button -> add class (for css) -> add icon -> append to Div
        const completeButton = document.createElement("button");
        completeButton.classList.add("complete-btn");
        completeButton.innerHTML = '<i class = "fas fa-check fa-2x"></i>';
        todoDiv.appendChild(completeButton);
        //Create Trash button
        const trashButton = document.createElement("button");
        trashButton.classList.add("trash-btn");
        trashButton.innerHTML = '<i class = "fas fa-trash fa-2x"></i>';
        todoDiv.appendChild(trashButton);
        //Append to todo list
        todoList.appendChild(todoDiv)
        });
}

//Remove items from local storage with the trash button
function removeLocalTodos(todo){
    //Check if already have thing in there?
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    //This constant returns the text item only (e.g. Apple)
    const todoIndex = todo.children[0].innerText;
    //From the todos, remove the nth element
    todos.splice(todos.indexOf(todoIndex), 1);
    //Put back into local storage
    localStorage.setItem("todos", JSON.stringify(todos));
}

