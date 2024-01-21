export default class Task {
  constructor(containerId, taskName, divId) {
    this.container = document.getElementById(containerId);
    this.div = document.createElement('div');
    this.div.id = divId;
    this.div.className = 'task';
    this.div.setAttribute('draggable', 'true');
    this.div.innerHTML = taskName;
    this.isDragging = false;

    document.body.appendChild(this.div);
    this.container.appendChild(this.div);

    this.addDraggableListeners();
  }

  addDraggableListeners() {
    this.div.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', this.div.id)
    });
  }
}

