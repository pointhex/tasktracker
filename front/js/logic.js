import Task from './task.js';

var numberOfTasks = 0;

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

window.allowDrop = function (event) {
    event.preventDefault();
}

window.drop = function (event, target) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const draggedDiv = document.getElementById(data);

    event.currentTarget.appendChild(draggedDiv);
}

window.AddTaskFunc = function () {
    const taskNameInput = document.getElementById('TaskName');
    const taskDescriptionInput = document.getElementById('TaskDescription');
    const taskName = taskNameInput.value || 'Task' + numberOfTasks++;
    const taskDescription = taskDescriptionInput.value || 'Task' + numberOfTasks++;

    const task = new Task('ToDoList', taskName, 'task' + numberOfTasks++);

    console.log("AddTaskFunc");
}

