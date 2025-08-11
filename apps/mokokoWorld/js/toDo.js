const toDoIcon = document.getElementById('toDo-icon');
const todoPopup = document.getElementById('todo-popup');
const closeTodoBtn = document.getElementById('todo-close');
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// 팝업 열기
toDoIcon.addEventListener('click', () => {
  todoPopup.style.display = 'block';
});

// 팝업 닫기
closeTodoBtn.addEventListener('click', () => {
  todoPopup.style.display = 'none';
});

// 저장 함수
function saveTodoList() {
  const todos = [];
  todoList.querySelectorAll('li').forEach(li => {
    todos.push({
      text: li.querySelector('span').textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('mokokoTodos', JSON.stringify(todos));
}

// 불러오기 함수
function loadTodoList() {
  const todosJSON = localStorage.getItem('mokokoTodos');
  if (!todosJSON) return;

  const todos = JSON.parse(todosJSON); // 로컬스토리지에 객체로 저장하기 위해 JSON을 사용하는 수 밖에..
  todos.forEach(todo => {
    addTodoItem(todo.text, todo.completed); // 완료 여부도 저장해야해서..
    // 그냥 문자열로 하면 파싱해야하고 또..오히려 더 복잡할 가능성이 있지 않나
  });
}

// 할 일 항목 추가 함수
function addTodoItem(text, completed = false) {
  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;
  if (completed) li.classList.add('completed');

  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed');
    saveTodoList();
  });

  const span = document.createElement('span');
  span.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '-';
  deleteBtn.style.color = 'red';
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTodoList();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

// 제출 버튼 누르면
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = todoInput.value.trim(); 
  if (text !== '') {
    addTodoItem(text); // 항목 추가해주고
    todoInput.value = '';
    saveTodoList(); // 저장하고
  }
});

// 페이지 로드시 데이터 복원
window.addEventListener('load', loadTodoList);
