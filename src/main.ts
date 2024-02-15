import './style.css'

type Todo = {
  title: string,
  isCompleted: boolean,
  readonly id: string,
}

const todos: Todo[] = [];

const todoContainer = <HTMLDivElement>document.querySelector(".todo-container");
const input = <HTMLInputElement>document.querySelector("input");
const form = <HTMLFormElement>document.getElementById('form');

form.onsubmit = (e) => {
  e.preventDefault();

  const todo: Todo = {
    title: input.value,
    isCompleted: false,
    id: String(Math.floor(Math.random() * 10)),
  }

  todos.push(todo);
  console.log(todos);
  renderTodo(todos)
}

const generateTodo = (title: string, isCompleted: boolean, id: string): void => {
  let divElement: HTMLDivElement = document.createElement("div");
  divElement.className = "todo";

  let cbInput: HTMLInputElement = document.createElement("input");
  cbInput.setAttribute("type", "checkbox");
  cbInput.className = "todo-c"
  cbInput.checked = isCompleted;
  cbInput.onchange = () => {
    todos.find((i) => {
      if (i.id === id) i.isCompleted = cbInput.checked;
    })
    para.className = cbInput.checked ? "textCut" : "";
  }

  let para: HTMLParagraphElement = document.createElement("p");
  // para.setAttribute("class","textCut");
  para.innerText = title;

  let delBtn: HTMLButtonElement = document.createElement("button");
  delBtn.className = "todo-c"
  delBtn.innerText = "X";
  delBtn.id = id;
  delBtn.onclick = () => {
    deleteTodo(id)
  }

  const deleteTodo = (id: string) => {
    let idx = todos.findIndex((i) => i.id === id);
    console.log(idx)
    todos.splice(idx, 1);
    renderTodo(todos)
  }

  divElement.append(cbInput, para, delBtn);

  todoContainer.appendChild(divElement);
}

const renderTodo = (todos: Todo[]) => {
  todoContainer.innerText = "";
  todos.forEach((i) => {
    generateTodo(i.title, i.isCompleted, i.id);
    input.value = "";
  })
}
