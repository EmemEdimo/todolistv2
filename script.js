// 'use strict';

window.addEventListener('load', () => {
  //When the window is loaded,grab the todos in the local storage, if there is none, grab an empty array
  todos = JSON.parse(localStorage.getItem('todos')) || [];
  const name = document.querySelector('#name');
  const taskForm = document.querySelector('#new-task-form');

  //Grab the user name from the local storage, if empty, return an empty string
  const userName = localStorage.getItem('username') || '';

  name.value = userName;
  //set name value to local storage
  name.addEventListener('change', (e) => {
    localStorage.setItem('username', e.target.value);
  });

  //   console.log(userName);

  //CREATE TODO ITEMS when form is submitted
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    //add new todo item to the todos array
    todos.push(todo);

    //add new todo item to local storage
    localStorage.setItem('todos', JSON.stringify(todos));

    e.target.reset();

    renderTodos();
  });
  renderTodos();
});

const renderTodos = function () {
  const tasks = document.querySelector('#todo-list');
  tasks.innerHTML = '';

  todos.forEach((todo) => {
    const task = document.createElement('div');
    task.classList.add('todo-item');

    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const content = document.createElement('div');
    const controls = document.createElement('div');
    const btnEdit = document.createElement('button');
    const btnDelete = document.createElement('button');

    input.type = 'checkbox';
    input.checked = todo.done;

    span.classList.add('bubble');
    if (todo.category === 'personal') {
      span.classList.add('personal');
    } else {
      span.classList.add('business');
    }

    content.classList.add('todo-content');
    controls.classList.add('controls');
    btnDelete.classList.add('delete');
    btnEdit.classList.add('edit');

    content.innerHTML = `<input type="text" value="${todo.content}" readonly />`;
    btnDelete.innerHTML = 'Delete';
    btnEdit.innerHTML = 'Edit';

    label.appendChild(input);
    label.appendChild(span);
    controls.appendChild(btnEdit);
    controls.appendChild(btnDelete);
    task.appendChild(label);
    task.appendChild(content);
    task.appendChild(controls);
    tasks.appendChild(task);
  });
};
