
let form = document.getElementById("task-form");
let taskList = document.getElementById("task-list");
let filterStatus = document.getElementById("filter-status");
let submitBtn = document.getElementById("submit-btn");
let cancelBtn = document.getElementById("cancel-btn");
let emptyMessage = document.getElementById("empty-message");

// Load tasks from Local Storage
let tasks = JSON.parse(localStorage.getItem("farmTasks")) || [];

// Save tasks to Local Storage
function saveTasks() {
    localStorage.setItem("farmTasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {

    taskList.innerHTML = "";

    let selectedStatus = filterStatus.value;

    let filteredTasks = tasks.filter(function(task) {
        return selectedStatus === "All" || task.status === selectedStatus;
    });

    filteredTasks.forEach(function(task) {

        let row = document.createElement("tr");

        // Task Name
        let nameCell = document.createElement("td");
        nameCell.textContent = task.name;

        // Description
        let descriptionCell = document.createElement("td");
        descriptionCell.textContent = task.description;

        // Category
        let categoryCell = document.createElement("td");
        categoryCell.textContent = task.category;

        // Date
        let dateCell = document.createElement("td");
        dateCell.textContent = task.date;

        // Status
        let statusCell = document.createElement("td");

        let statusSelect = document.createElement("select");

        let statuses = ["Pending", "In Progress", "Completed"];

        statuses.forEach(function(status) {
            let option = document.createElement("option");
            option.textContent = status;
            option.value = status;

            if (task.status === status) {
                option.selected = true;
            }

            statusSelect.appendChild(option);
        });

        statusCell.appendChild(statusSelect);

        // Actions
        let actionCell = document.createElement("td");

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.type = "button";

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.type = "button";

        actionCell.appendChild(editBtn);
        actionCell.appendChild(deleteBtn);

        // Add cells to row
        row.appendChild(nameCell);
        row.appendChild(descriptionCell);
        row.appendChild(categoryCell);
        row.appendChild(dateCell);
        row.appendChild(statusCell);
        row.appendChild(actionCell);

        // Store task ID in row
        row.setAttribute("data-id", task.id);

        taskList.appendChild(row);
    });

    emptyMessage.style.display = filteredTasks.length === 0 ? "block" : "none";
}

// Add or Update Task
form.addEventListener("submit", function(event) {

    event.preventDefault();

    let id = document.getElementById("task-id").value;

    let task = {
        id: id ? Number(id) : Date.now(),
        name: document.getElementById("task-name").value,
        description: document.getElementById("task-description").value,
        category: document.getElementById("task-category").value,
        date: document.getElementById("task-date").value,
        status: document.getElementById("task-status").value
    };

    if (id) {

        // Update existing task
        let existingTask = tasks.find(function(item) {
            return item.id === Number(id);
        });

        if (existingTask) {
            existingTask.name = task.name;
            existingTask.description = task.description;
            existingTask.category = task.category;
            existingTask.date = task.date;
            existingTask.status = task.status;
        }

    } else {

        // Create new task
        tasks.push(task);
    }

    saveTasks();
    displayTasks();
    form.reset();
    document.getElementById("task-id").value = "";
    submitBtn.textContent = "Add Task";
});

// Edit and Delete Task
taskList.addEventListener("click", function(event) {

    let row = event.target.closest("tr");

    if (!row) return;

    let id = Number(row.getAttribute("data-id"));

    // Edit
    if (event.target.classList.contains("edit-btn")) {

        let task = tasks.find(function(item) {
            return item.id === id;
        });

        if (task) {
            document.getElementById("task-id").value = task.id;
            document.getElementById("task-name").value = task.name;
            document.getElementById("task-description").value = task.description;
            document.getElementById("task-category").value = task.category;
            document.getElementById("task-date").value = task.date;
            document.getElementById("task-status").value = task.status;

            submitBtn.textContent = "Update Task";
        }
    }

    // Delete
    if (event.target.classList.contains("delete-btn")) {

        tasks = tasks.filter(function(item) {
            return item.id !== id;
        });

        saveTasks();
        displayTasks();
    }
});

// Update Task Status
taskList.addEventListener("change", function(event) {

    if (event.target.tagName === "SELECT") {

        let row = event.target.closest("tr");
        let id = Number(row.getAttribute("data-id"));

        let task = tasks.find(function(item) {
            return item.id === id;
        });

        if (task) {
            task.status = event.target.value;
            saveTasks();
            displayTasks();
        }
    }
});

// Filter Tasks
filterStatus.addEventListener("change", displayTasks);

// Cancel Editing
cancelBtn.addEventListener("click", function() {
    form.reset();
    document.getElementById("task-id").value = "";
    submitBtn.textContent = "Add Task";
});

// Initial Display
displayTasks();
