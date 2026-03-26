const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

const saved = localStorage.getItem("todos");
let todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodoNode(todo, index) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        saveTodos();
        render(); // Re-render to apply the strike-through class
    });

    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.className = "todo-text" + (todo.completed ? " completed" : "");
    
    // Double-click to edit
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit todo", todo.text);
        if (newText !== null && newText.trim() !== "") {
            todo.text = newText.trim();
            saveTodos();
            render();
        }
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "del-btn";
    delBtn.addEventListener("click", () => {
        todos.splice(index, 1);
        saveTodos();
        render();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    return li;
}

function render() {
    list.innerHTML = "";
    // Fixed: changed forEacch to forEach
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node);
    });
}

function addTodo() {
    // Fixed: changed ariaValueMax to value
    const text = input.value.trim();
    if (!text) return;

    todos.push({ text: text, completed: false });
    input.value = "";
    saveTodos(); // Save first
    render();    // Then render
}

addBtn.addEventListener("click", addTodo);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});

// Initial render
render();