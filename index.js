let input = document.getElementById('add-input');
let button = document.getElementById('add-button');
let todosUl = document.getElementById('todos').querySelector('.todos__ul');
let todos = [];

function displayTodos () {
  todosUl.innerHTML = ''
  todos.forEach((item) => {
    todosUl.innerHTML += `
      <li class='todos__li' id='${item.id}'>
        <span class'wrapper'>
          <input type='checkbox' id='todo_${item.id}' ${item.checked ? 'checked' : ''} />
          <label for='item_${item.id}' class='${item.checked ? 'done' : ''} ${item.important ? 'important' : ''}'>${item.todo}</label>
        </span>
        <button onclick='deleteTodo(this)' class='delete-todo' id='${item.id}'>X</button>
      </li>
    `
  })
}

function deleteTodo (element) {
  let id = element.getAttribute('id')
  todos = todos.filter((item) => {
    return item.id !== id
  })
  displayTodos()
  localStorage.setItem('todos', JSON.stringify(todos));
}

function handleAddButton () {
  if (input.value) {
    const newTodo = {
      id: gen16id(),
      todo: input.value,
      checked: false,
      important: false
    }

    input.value = ''
    
    todos.push(newTodo)
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos()
  } else return
}

button.addEventListener('click', handleAddButton)

document.addEventListener('DOMContentLoaded', () => {
  storedTodos = localStorage.getItem('todos')
  if (storedTodos) {
    todos = JSON.parse(storedTodos)
    displayTodos()
  }
})

todosUl.addEventListener('change', (event) => {
  let idInput = event.target.getAttribute('id').split('_')[1]

  todos.forEach((item) => {
    if (item.id === idInput) {
      item.checked = !item.checked
      localStorage.setItem('todos', JSON.stringify(todos));
      displayTodos()
    }
  })
})

todosUl.addEventListener('contextmenu', (event) => {
  event.preventDefault()

  let idInput = event.target.getAttribute('for').split('_')[1]

  todos.forEach((item) => {
    if (item.id === idInput) {
      item.important = !item.important
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  })
  displayTodos()
})