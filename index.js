const addBtn = document.querySelector('.add-btn');
const editBtn = document.querySelector('.edit-btn');
const editTaskBtn = document.querySelector('.edit-todo');
const deleteBtn = document.querySelector('.delete-todo');
const input = document.querySelector('#todo');
const list = document.querySelector('.list');
const span = document.querySelector('span');
const container = document.querySelector('.container');
const lightSwitch = document.querySelector('#switch');

const createTodo = (value) => {
    return `
    <span class="todo-item">${value}</span>
    <input type="button" class="btn todo-btn edit-todo" value="Edit">
    <input type="button" class="btn todo-btn delete-todo" value="Delete">`
}

// change elements from light to dark
const darkmode = (bool) => {
    document.body.style.backgroundColor = bool ? '#121212' : '#4267b2';
    document.body.style.color = bool ? '#e4e6eb' : '#121212';
    container.style.backgroundColor = bool ? '#171f24' : '#f5f5f5';
    container.style.borderColor = bool ? '#121212' : '#f5f5f5';
    const allBtns = document.querySelectorAll('.btn');
    allBtns.forEach(btn => {
        btn.style.color = bool ? '#121212': '#f5f5f5';
    })
}

// toggle disable class on each task that is not being edited
const toggleDisableClass = () => {
    const tasks = document.querySelectorAll('.each-todo');
    if (tasks.length <= 1) {
        return
    }else {
        tasks.forEach(task => {
            task.classList.contains('editing') ? '' : task.classList.toggle('disabled');
        })
    }
} 

// check to see if switch is checked after restarting the page
darkmode(lightSwitch.checked)

// toggle between light and dark
lightSwitch.addEventListener('click', () => {
    darkmode(lightSwitch.checked)
})

//event listener for adding a task
addBtn.addEventListener('click', () => {
    if (input.value === '') return
    const div = document.createElement('div')
    div.classList.add('each-todo')
    div.innerHTML = createTodo(input.value)
    list.appendChild(div)
    input.value = '';
})

//event listener for editing task
editBtn.addEventListener('click', () => {
    const editTodo = document.getElementsByClassName('editing')[0];
    if (input.value === '') return
    editTodo.childNodes[1].innerText = input.value;
    toggleDisableClass();
    editTodo.classList.remove('editing');
    input.value = '';
    addBtn.classList.remove('hide');
    editBtn.classList.add('hide');
})

// dynamic event listener for delete-task btn
list.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-todo')){
        e.target.parentElement.remove()
    }
})

//dynamic event listener for span
list.addEventListener('click', (e) => {
    if (e.target.classList.contains('todo-item')){
        e.target.classList.toggle('finished');
        if (e.target.classList.contains('finished')){
            e.target.nextElementSibling.disabled = true;
        }else {
            e.target.nextElementSibling.disabled = false;
        }
    }
})

// dynamic event listener for edit-task btn
list.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-todo')){
        e.target.parentElement.classList.add('editing')
        input.value = e.target.parentElement.innerText;
        addBtn.classList.add('hide');
        editBtn.classList.remove('hide');
        toggleDisableClass()
    }
})
