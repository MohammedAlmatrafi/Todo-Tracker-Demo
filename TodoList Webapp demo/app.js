const todoList = document.querySelector('.todos');
const searchContainer = document.querySelector('.search');
const searchInput = document.querySelector('.search input');
const newTodoForm = document.querySelector('.add');

//Retreive todoList items from the localStorage
todoList.innerHTML = localStorage.getItem('todos');

//if there are any items shows them and the search bar
if(todoList.innerHTML != ''){
    //shows any possible hidden list item by default
    for(let i = 0; i < todoList.children.length;i++){
        todoList.children[i].classList.remove('filtered')
    }
    searchContainer.classList.remove('d-none');
}


//Receives item name and creates a new li and returns it
function addNewTodo(todoItem){
    const li = Object.assign(document.createElement('li'), {classList: "list-group-item d-flex justify-content-between align-items-center py-3 fs-4"});
    li.append(document.createElement('span'), Object.assign(document.createElement('i'),{classList: 'far fa-trash-alt delete'}))
    li.querySelector('span').innerText = todoItem;
    return li
}

//When pressing "Enter" it creates a new todo item and append it to the list
newTodoForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const todoItem = newTodoForm.querySelector('input').value
    if(todoItem !== ""){
        todoList.append(addNewTodo(newTodoForm.querySelector('input').value.trim()))
        searchContainer.classList.remove('d-none'); //Shows search input when adding new todo item
        newTodoForm.querySelector('input').value = ""; //Reset input to blank
        localStorage.setItem('todos', todoList.innerHTML); //Save the current List items
    }
    
})

//Deleting the the list item
document.addEventListener("click", e => {
    if(Array.from(e.target.classList).includes('delete')){
        e.target.parentNode.remove();
        localStorage.setItem('todos', todoList.innerHTML); //Save the current List items
        
        if(todoList.innerHTML == ''){
            searchContainer.classList.add('d-none'); //When there are no items, hide the search bar
        }
    }

})


//Match todoList items with "term"
function searchTodoList(term){
    //If they DON'T match add filtered css class to hide the item
    Array.from(todoList.children) 
        .filter(todo => !todo.textContent.toLowerCase().includes(term)) 
        .forEach(todo => todo.classList.add("filtered"));
    //If they match remove filtered css class to show the item
    Array.from(todoList.children)
        .filter(todo => todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.remove("filtered"));
}

//Whenever a key is pressed the search begins
searchInput.addEventListener('keyup', ()=>{
    const term = searchInput.value.trim().toLowerCase();
    searchTodoList(term);
})