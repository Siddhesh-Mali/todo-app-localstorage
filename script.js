const task = document.getElementById("task");
const deadline = document.getElementById("deadline");
const priority = document.getElementById("priority");
const add = document.getElementById("add");
const today = document.getElementById("today");
const future = document.getElementById("future");
const completed = document.getElementById("completed");
const done_task = document.getElementsByClassName("done_task");
const delete_task = document.getElementsByClassName("delete_task");
let obj = { today: [], future: [], completed: [] };
console.log(obj);



// event listeners for adding tasks
add.addEventListener("click", () => {
  let task_name = task.value;
  let deadline_date = deadline.value;
  let priority_name = priority.value;
  let isCompleted = false ;
  
  let id = String(new Date().getMilliseconds() * Math.random());
 
  let date = new Date().toISOString().split('T')[0];
  console.log(date, deadline_date);

  if (deadline_date == date) {
    obj.today.push({
        "id": id,
        "task": task_name ,
        "deadline": deadline_date,
        "priority": priority_name,
        "completed": isCompleted
    })
  } else if (deadline_date > date) {

    obj.future.push({
        "id": id,
        "task": task_name ,
        "deadline": deadline_date,
        "priority": priority_name,
        "completed": isCompleted
    })
  } else if (deadline_date < date) {

    obj.completed.push({
        "id": id,
        "task": task_name ,
        "deadline": deadline_date,
        "priority": priority_name,
        "completed": isCompleted
    })
  }

  // Update localStorage
  updateLocalStorage();
  // Render tasks
  renderTasks();
  console.log(obj);
});



// event listeners for marking tasks as done and deleting tasks
document.querySelector('.container').addEventListener('click', function(event) {
  const card = event.target.closest('.card');
  if (!card) return; // Ignore clicks outside cards

  const taskId = card.getAttribute('id');
  const sectionId = card.parentNode.getAttribute('id');
  const section = sectionId === 'today' ? 'today' : sectionId === 'future' ? 'future' : 'completed';

  if (event.target.classList.contains('done_task')) {
      // Mark task as completed
      markTaskAsCompleted(taskId, section);
  } else if (event.target.classList.contains('delete_task')) {
      // Delete task
      deleteTask(taskId, section);
  }
});

function markTaskAsCompleted(taskId, section) {
  const taskIndex = obj[section].findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
      const completedTask = obj[section].splice(taskIndex, 1)[0];
      completedTask.completed = true;
      obj.completed.push(completedTask);
      updateLocalStorage();
      renderTasks();
  } else {
      console.error("Task not found in section:", taskId, section);
  }
}

function deleteTask(taskId, section) {
  const taskIndex = obj[section].findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
      obj[section].splice(taskIndex, 1);
      updateLocalStorage();
      renderTasks();
  } else {
      console.error("Task not found in section:", taskId, section);
  }
}



// Function to update localStorage
function updateLocalStorage() {
  localStorage.setItem("todoData", JSON.stringify(obj));
}

// Function to load data from localStorage
function loadFromLocalStorage() {
  const data = localStorage.getItem("todoData");
  if (data) {
    obj = JSON.parse(data);
    // Render tasks from localStorage
    renderTasks();
  }
}

// Loading data from localStorage when the page loads
window.addEventListener("load", loadFromLocalStorage);


// Function to render tasks on the DOM
function renderTasks() {
  today.innerHTML = "";
  future.innerHTML = "";
  completed.innerHTML = "";

  obj.today.forEach((task) => createCard(today, task));
  obj.future.forEach((task) => createCard(future, task));
  obj.completed.forEach((task) => createCard(completed, task));

  obj.completed.forEach((task) => {
    if(task.completed == true){
      document.getElementById(task.id).style.border = "3px solid green"
    }
    else if(task.completed == false){
      document.getElementById(task.id).style.border = "2px solid red"
    }
  });
}

// Function to create card element
function createCard(section, task) {
  const create_card = document.createElement("div");
  create_card.classList.add("card");
  create_card.setAttribute("id", task.id);
  create_card.innerHTML = `
      <div class="card_task">${task.task}</div>
      <div class="card_date">${task.deadline}</div>
      <div class="card_priority">Priority: ${task.priority}</div>
      <div class="card_icon">
          <i class="fa-regular fa-circle-check done_task"></i>
          <i class="fa-solid fa-trash delete_task"></i>
      </div>
  `;
  section.appendChild(create_card);
}

