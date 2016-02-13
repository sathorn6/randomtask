import TaskStore from "./TaskStore";

export default {
  createTask(name, repeats) {
    TaskStore.createTask(name, repeats);
  },
  updateTask(id, name, repeats) {
    TaskStore.updateTask(id, name, repeats);
  },
  deleteTask(id) {
    TaskStore.deleteTask(id);
  },
  pickRandomTask() {
    const index = Math.floor(Math.random() * TaskStore.getTasks().length);
    TaskStore.setSelectedTask(TaskStore.getTaskByIndex(index));
  },
  finishSelectedTask() {
    const selected = TaskStore.getSelectedTask();

    if(!selected)
      return;
    
    if(!selected.repeats)
      TaskStore.deleteTask(selected);
    
    TaskStore.setSelectedTask(null);
  }
};