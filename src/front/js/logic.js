import Task from './task.js';

var numberOfTasks = 3;

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
    const taskDescription = taskDescriptionInput.value || 'Task' + numberOfTasks;
    
    const dataToSend = { taskName: taskName, taskDescription: taskDescription, done: false };

    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Response from backend:', data);
            new Task('ToDoList', taskName, 'task' + numberOfTasks, data.id);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


document.addEventListener('DOMContentLoaded', requestData);

function requestData() {
    fetch('/tasks')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received from backend:', data);
            data.forEach(task => {
                if (task.done) {
                    return new Task('DoneList', task.name, 'task' + task.id, task.id);
                }
                new Task('ToDoList', task.name, 'task' + task.id, task.id);
            });
            // Handle the data as needed
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
