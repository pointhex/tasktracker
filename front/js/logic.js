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

    // test
    const dataToSend = { message: 'Hello from the frontend!' };

    fetch('http://localhost:3000/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Response from backend:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


document.addEventListener('DOMContentLoaded', requestData);

function requestData() {
    fetch('http://localhost:3000/api/data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received from backend:', data);
            // Handle the data as needed
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
