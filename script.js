const task = document.getElementById("task");
const deadline = document.getElementById("deadline");
const priority = document.getElementById("priority");
const add = document.getElementById("add");
const today = document.getElementById("today");
const future = document.getElementById("future");
const completed = document.getElementById("completed");


add.addEventListener("click",()=>{
let task_name = task.value ;
let deadline_date = deadline.value ;
let priority_name = priority.value ;
console.log(task_name,priority_name,deadline_date)


const create_card = document.createElement("div");
create_card.classList.add("card");
create_card.innerHTML = `
    <div class="card_task"> ${task_name} </div>
    <div class="card_date"> ${deadline_date} </div>
    <div class="card_priority">Priority: ${priority_name} </div>
    <div class="card_icon"><i class="fa-regular fa-circle-check done_task"></i><i class="fa-solid fa-trash delete_task"></i></div>
    `;
    const d = new Date("03/25/2015");
    var date = (new Date()).toISOString().split('T')[0];
console.log(date,typeof date);

if(deadline_date==date){
    today.append(create_card)
}
else if(deadline_date>date){
    future.append(create_card)
}
else if(deadline_date<date){
    completed.append(create_card)
}


})