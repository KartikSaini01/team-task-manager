const API_URL = "team-task-manager-production-85fd.up.railway.app";

let token = "";


// LOGIN USER
async function loginUser() {

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  try {

    const response = await fetch(`${API_URL}/auth/login`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        email,
        password
      })

    });

    const data = await response.json();

    if (data.token) {

      token = data.token;

      alert("Login Successful");

    } else {

      alert("Login Failed");

    }

  } catch (error) {

    console.log(error);

    alert("Error logging in");

  }

}


// CREATE TASK
async function createTask() {

  const title = document.getElementById("taskTitle").value;

  const assignedTo = document.getElementById("assignedTo").value;

  const dueDate = document.getElementById("dueDate").value;

  const status = document.getElementById("status").value;

  try {

    await fetch(`${API_URL}/tasks`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "authorization": token
      },

      body: JSON.stringify({
        title,
        assignedTo,
        dueDate,
        status
      })

    });

    alert("Task Created Successfully");

    getTasks();

  } catch (error) {

    console.log(error);

    alert("Error creating task");

  }

}


// GET TASKS + DASHBOARD
async function getTasks() {

  try {

    const response = await fetch(`${API_URL}/tasks`, {

      headers: {
        "authorization": token
      }

    });

    const tasks = await response.json();

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    let pending = 0;

    let completed = 0;

    let overdue = 0;


    tasks.forEach(task => {

      if (task.status === "pending") {
        pending++;
      }

      if (task.status === "completed") {
        completed++;
      }

      if (
        task.dueDate &&
        new Date(task.dueDate) < new Date() &&
        task.status !== "completed"
      ) {
        overdue++;
      }

      const li = document.createElement("li");

      li.innerHTML = `
        <b>${task.title}</b><br>
        Assigned To: ${task.assignedTo}<br>
        Status: ${task.status}<br>
        Due Date: ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Due Date"}
      `;

      taskList.appendChild(li);

    });


    document.getElementById("totalTasks").innerText = tasks.length;

    document.getElementById("pendingTasks").innerText = pending;

    document.getElementById("completedTasks").innerText = completed;

    document.getElementById("overdueTasks").innerText = overdue;

  } catch (error) {

    console.log(error);

    alert("Error fetching tasks");

  }

}