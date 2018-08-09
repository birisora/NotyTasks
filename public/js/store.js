// const emptyTaskObj = [{
//   title: '',
//   image: '',
//   content: '',
//   time: '',
//   category: ''
// }];

// Store file to grab variables and data needed
const store = (function () {

  function addToTasks (task) {
    this.tasks = [task, ...this.tasks];
  }

  function addAllTasks (tasks) {
    this.tasks = tasks;
  }

  function findAndRemove (id) {
    this.tasks = this.tasks.filter(task => task._id !== id);
  }

  function editTaskContent (id) {
    this.toEditTask = this.tasks.filter(task => task._id === id);
    console.log('this.toEditTask', this.toEditTask);
  }

  return {
    authToken: '',
    loggedIn: false,
    tasks: [],
    taskId: '',
    toEditTask: [],
    addToTasks,
    addAllTasks,
    findAndRemove,
    editTaskContent,
    screen: 'login'
  };
}());
