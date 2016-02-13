class TaskStore {
  constructor() {
    this._selectedTask = null;
    
    if(window.localStorage.taskStoreData)
      this._tasks = JSON.parse(window.localStorage.taskStoreData);
    else
      this._tasks = [];
    
    this._listeners = [];
    this.onChange(() => {
      window.localStorage.taskStoreData = JSON.stringify(this._tasks);
    });
  }
  
  onChange(cb) {
    this._listeners.push(cb);
  }
  
  change() {
    this._listeners.forEach((listener) => listener());
  }
  
  getTasks() {
    return this._tasks;
  }
  
  getTask(id) {
    const index = this._tasks.indexOf(id);
    if(index == -1)
      throw new Error("Task not found");
    
    return this._tasks[index];
  }
  
  getTaskByIndex(index) {
    return this._tasks[index];
  }
  
  getSelectedTask() {
    return this._selectedTask;
  }
  
  createTask(name, repeats) {
    let task = {
      id: Date.now(),
      name,
      repeats,
      wasSelected: false
    };
    
    this._tasks.push(task);
    
    this.change();
  }
  
  updateTask(id, name, repeats) {
    let task = this.getTask(id);
    task.name = name;
    task.repeats = repeats;
    task.wasSelected = false;
    this.change();
  }
  
  deleteTask(id) {
    const index = this._tasks.indexOf(id);
    if(index == -1)
      throw new Error("Task not found");
    
    this._tasks.splice(index, 1);
    
    this.change();
  }
  
  setSelectedTask(id) {
     this._tasks.forEach((task) => {
       task.wasSelected = (task == this._selectedTask);
     });

    if(id != null)
      this._selectedTask = this.getTask(id);
    else
      this._selectedTask = null;
    
    this.change();
  }
}

export default new TaskStore();