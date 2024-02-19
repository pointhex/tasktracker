export default class Task {
  constructor(containerId, taskName, divId, Id) {
    this.container = document.getElementById(containerId);
    this.div = document.createElement('div');
    this.div.className = 'task';
    this.div.id = divId;
    this.div.setAttribute('draggable', 'true');
    this.div.innerHTML = taskName;
    this.isDragging = false;
    
    document.body.appendChild(this.div);
    this.container.appendChild(this.div);
    
    this.addDraggableListeners();

    this.id = Id;
  }

  addDraggableListeners() {
    this.div.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', this.div.id)
      console.log('dragstart');
    });
    this.div.addEventListener('dragend', (event) => {
      console.log('dragend' + this.div.parentElement.id);
    });
  }

}

