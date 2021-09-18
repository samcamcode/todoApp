const addBtn = document.querySelector('.add-btn');
const editBtn = document.querySelector('.edit-btn');
const deleteBtn = document.querySelector('.delete-todo');
const input = document.querySelector('#todo');
const list = document.querySelector('.list');
const span = document.querySelector('span');

const createTodo = (value) => {
    return `
    <span class="todo-item">${value}</span>
    <input type="button" class="todo-btn edit-todo" value="Edit">
    <input type="button" class="todo-btn delete-todo" value="Delete">`
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
    if (input.value === '') return
    editTodo.childNodes[1].innerText = input.value;
    editTodo.classList.remove('editing');
    input.value = '';
    addBtn.classList.remove('hide');
    editBtn.classList.add('hide');
})

// dynamic event listener for delete-todo btn
list.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-todo')){
        e.target.parentElement.remove()
    }
})

//dynamic event listener for span
list.addEventListener('click', (e) => {
    if (e.target.classList.contains('todo-item')){
        e.target.classList.toggle('finished')
    }
})

// dynamic event listener for edit-todo btn
list.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-todo')){
        e.target.parentElement.classList.add('editing')
        input.value = e.target.parentElement.innerText;
        addBtn.classList.add('hide');
        editBtn.classList.remove('hide');
    }
})

