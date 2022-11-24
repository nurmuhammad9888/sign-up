const saveToken = localStorage.getItem("token");
if (!saveToken) {
    window.location.href = "/register.html";
}

// DOM 
const elForm = document.querySelector(".todo-form");
const elFormEdit = document.querySelector(".edit-form");
const elTodoInput = document.querySelector(".todo-input");
const elTodoEditInput = document.querySelector(".modal-edit");
const elList = document.querySelector(".login-list");
const elTemplate = document.querySelector(".login-template").content;
const loginFragment = document.createDocumentFragment();

// FUNCTION GET
async function todoGet(){
    try {
        const res = await fetch("http://localhost:5000/todo",{
        headers:{
            Authorization:saveToken
        }
    });
    const data = await res.json();
    renderFunc(data)
}catch (err){
    console.log(err);
}
}
todoGet();

// FUNCTION POST
async function todoPost(){
    try {
        const res = await fetch("http://localhost:5000/todo",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:saveToken
        },
        body:JSON.stringify({
            text:elTodoInput.value.trim()
        })
    })
    const data = await res.json();
    
} catch (error) {
    console.log(error);
}
}

// EDIT TODOS
async function editFunc(id){
    const todoTitleEdit = prompt("Todo title edit")
    try {
        const res = await fetch(`http://localhost:5000/todo/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization:saveToken
        },
        body:JSON.stringify({
            text:todoTitleEdit
        })
    })
    alert("Ok")
    todoGet();
    
} catch (error) {
    console.log(error);
}
}

// DLETE TODOS
async function deletFunc(id){
    try {
        const res = await fetch(`http://localhost:5000/todo/${id}`,{
        method:"DELETE",
        headers:{
            Authorization:saveToken
        }
    })
    const data = await res.json();
    todoGet();
} catch (error) {
    console.log(error);
}
}

// DOM FORM SUBMIT
elForm.addEventListener("submit", evt =>{
    evt.preventDefault();
    todoPost();
    todoGet();
    
    elForm.reset();
})

// RENDER FUNCTION 
function renderFunc(arr) {
    elList.innerHTML = "";
    arr.forEach(item => {
        const tempClone = elTemplate.cloneNode(true);
        tempClone.querySelector(".login-title").textContent = item.todo_value;
        tempClone.querySelector(".btn-edit").dataset.id = item.id;
        tempClone.querySelector(".btn-delet").dataset.id = item.id;
        loginFragment.appendChild(tempClone);
    })
    elList.appendChild(loginFragment);
}

// LEST EVENT EDIT BTN && DELET BTN TODOS UDATE
elList.addEventListener("click", evt =>{
    
    if(evt.target.matches(".btn-edit")){
        const editBtnId = evt.target.dataset.id;
        editFunc(editBtnId)
    }
    
    if(evt.target.matches(".btn-delet")){
        const deletBtnId = evt.target.dataset.id;
        deletFunc(deletBtnId)
    }
})
