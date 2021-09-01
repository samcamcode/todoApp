const addBtn = document.querySelector('.add-btn');
const deleteBtn = document.querySelector('.delete-btn');
const input = document.querySelector('#todo');
const list = document.querySelector('.list');
const span = document.querySelector('span');

const createTodo = (value) => {
    return `<div class="each-todo">
    <span class="todo-item">${value}</span>
    <button class="delete-btn">Delete</button>
    </div>`
}

addBtn.addEventListener('click', () => {
    if (input.value === '') return
    const div = document.createElement('div')
    div.classList.add('todos-list')
    div.innerHTML = createTodo(input.value)
    list.appendChild(div)
    input.value = '';
})

// dynamic event listener for deletebtn
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


