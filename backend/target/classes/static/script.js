const API = "/api/tasks";

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

// Load all tasks
async function loadTasks() {
    const response = await fetch(API);
    const tasks = await response.json();

    taskList.replaceChildren();

    tasks.forEach(task => {
        const card = document.createElement("div");
        card.className = "task";

        const title = document.createElement("h3");
        title.textContent = task.title;

        const description = document.createElement("p");
        description.textContent = task.description;

        const status = document.createElement("p");
        status.textContent = "Status: " + task.status;

        const updateButton = document.createElement("button");
        updateButton.className = "complete";
        updateButton.textContent =
            task.status === "COMPLETED" ? "Mark Pending" : "Complete";

        updateButton.onclick = () => updateTask(task);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete";
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteTask(task.id);

        card.append(title, description, status, updateButton, deleteButton);
        taskList.appendChild(card);
    });
}

// Add a task
taskForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const task = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        status: "PENDING"
    };

    await fetch(API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
    });

    taskForm.reset();
    loadTasks();
});

// Update a task
async function updateTask(task) {
    task.status = task.status === "COMPLETED" ? "PENDING" : "COMPLETED";

    await fetch(`${API}/${task.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
    });

    loadTasks();
}

// Delete a task
async function deleteTask(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}

// Initial load
loadTasks();
