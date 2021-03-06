const addBtn = document.querySelector('.add-btn');
const editBtn = document.querySelector('.edit-btn');
const editTaskBtn = document.querySelector('.edit-todo');
const deleteBtn = document.querySelector('.delete-todo');
const input = document.querySelector('#todo');
const list = document.querySelector('.list');
const span = document.querySelector('span');
const container = document.querySelector('.container');
const lightSwitch = document.querySelector('#switch');

// return the tasks in LS or empty array
const getTaskList = () => {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

let taskList = getTaskList()

// create a random num for id
const randomId = () => {
    const id = Math.random(10);
    return parseInt(id.toString().split('.')[1]);
}

const createTodo = (item) => {
    return `
    <span class="todo-item">${item.task}</span>
    <input type="button" class="btn todo-btn edit-todo" value="Edit">
    <input type="button" class="btn todo-btn delete-todo" value="Delete">`
}

// populate tasks to screen from local storage
const populateTasks = (arr) => {
    if (arr.length < 1) return
    arr.forEach((task) => {
        const div = document.createElement('div')
        div.setAttribute('id', `${task.id}`)
        div.classList.add('each-todo')
        div.innerHTML = createTodo(task)
        list.appendChild(div)
    })
}

// load tasks on window load
window.addEventListener('load', () => {
    populateTasks(taskList)
})


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
    const taskObj = {id: randomId(), task: input.value};
    taskList.push(taskObj);
    localStorage.setItem('tasks', JSON.stringify(taskList))
    const div = document.createElement('div')
    div.setAttribute('id', `${taskObj.id}`)
    div.classList.add('each-todo')
    div.innerHTML = createTodo(taskObj)
    list.appendChild(div)
    input.value = '';
})

//event listener for editing task
editBtn.addEventListener('click', () => {
    const editTodo = document.getElementsByClassName('editing')[0];
    if (input.value === '') return
    editTodo.childNodes[1].innerText = input.value;
    taskList.forEach(item => {
        if (item.id === parseInt(editTodo.id)) {
            item.task = input.value
        }
    })
    toggleDisableClass();
    editTodo.classList.remove('editing');
    input.value = '';
    addBtn.classList.remove('hide');
    editBtn.classList.add('hide');
    localStorage.removeItem('tasks');
    localStorage.setItem('tasks',JSON.stringify(taskList))
})

// dynamic event listener for delete-task btn
list.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-todo')){
        e.target.parentElement.remove();
        taskList = taskList.filter(task => {
            return task.id !== parseInt(e.target.parentElement.id)
        })
        localStorage.removeItem('tasks');
        localStorage.setItem('tasks',JSON.stringify(taskList))
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
