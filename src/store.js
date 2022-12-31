import { defineStore } from 'pinia'

export const todoListStore = defineStore('todoList', {
  state: () => ({ taskList: [], loading: false }),
  getters: {
    uncheckeds() {
      return this.taskList.filter(task => task.checked == false);
    },
    checkeds() {
      return this.taskList.filter(task => task.checked == true);
    }
  },
  actions: {
    findTaskIndex(task) {
      const index = this.taskList.findIndex(item => item.id === task.id);
      return index;
    },
    addTask(task) {
      if(task.description.trim() != "") {
        this.loading = true;
        setTimeout(() => {
          task.id = Date.now() + Math.floor(Math.random() * 100);
          this.taskList.push(task);
          this.loading = false;
        }, 400);
      }
    },
    toggleTask(task) {
      if(this.findTaskIndex(task) > -1) {
        const index = this.findTaskIndex(task);
        this.taskList[index].checked = !this.taskList[index].checked;
      }
    },
    deleteTask(task) {
      if(this.findTaskIndex(task) > -1) {
        const index = this.findTaskIndex(task);
        this.taskList.splice(index, 1);
      }
    },
    checkAll() {
      if(this.taskList.length > 0) this.taskList.forEach(task => task.checked = true);
    },
    unCheckAll() {
      if(this.taskList.length > 0) this.taskList.forEach(task => task.checked = false);
    }
  }
});
