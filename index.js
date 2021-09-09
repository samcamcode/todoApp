const addBtn = document.querySelector('.add-btn');
const editBtn = document.querySelector('.edit-btn');
const deleteBtn = document.querySelector('.delete-btn');
const input = document.querySelector('#todo');
const list = document.querySelector('.list');
const span = document.querySelector('span');

const createTodo = (value) => {
    return `
    <span class="todo-item">${value}</span>
    <input type="button" class="todo-btn edit-todo" value="Edit">
    <input type="button" class="todo-btn delete-btn" value="Delete">`
}

//event listener for add todo
addBtn.addEventListener('click', () => {
    if (input.value === '') return
    const div = document.createElement('div')
    div.classList.add('each-todo')
    div.innerHTML = createTodo(input.value)
    list.appendChild(div)
    input.value = '';
})

//event listener for edit todo
editBtn.addEventListener('click', () => {
    const editTodo = document.getElementsByClassName('editing')[0];
    editTodo.childNodes[1].innerText = input.value;
    editTodo.classList.remove('editing');
    input.value = '';
})

// dynamic event listener for delete-btn
list.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')){
        e.target.parentElement.remove()
    }
})

//dynamic event listener for span
list.addEventListener('click', (e) => {
    if (e.target.classList.contains('todo-item')){
        e.target.classList.toggle('finished')
    }
})

// dynamic event listener for edit-todo
list.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-todo')){
        e.target.parentElement.classList.add('editing')
        input.value = e.target.parentElement.innerText;
    }
})

// changes
// 2 sep
// add todo btn changed to input type button
// changed styling from each-todo to todo-item
// working on edit-todo creating btn and editing todo with changing the entire element
