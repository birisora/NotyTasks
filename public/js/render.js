const createForm = (form) => {
  return `
    <form class="${form.classes}">
      <fieldset>
        <legend>${form.legend}</legend>
          <ul class="flex-outer">
          ${form.inputs.map((input) => {
            return `
              <li>
                <label for="${input.labelFor}">${input.label}</label>
                <input 
                  type="${input.type}" 
                  name="${input.name}" 
                  class="${input.class}" 
                  placeholder="${input.placeholder}"
                  value="${input.value ? input.value : ''}"
                  >
              </li>
            `;
            // .join('') removed the random commas between list elements
            }).join('')} 
            <li>
              <button type="submit">Submit</button>
            </li>
          </ul>
        </fieldset>
    </form>
  `;
};

const createEditForm = (form) => {
  return `
    <form class="createtask-edit-css createtask-edit-form">
      <fieldset>
        <legend>${form.legend}</legend>
          <ul class="flex-outer">
          ${form.inputs.map((input) => {
            const inputLabel = input.labelFor;
            return `
              <li>
                <label for="${input.labelFor}">${input.label}</label>
                <input 
                  type="${input.type}" 
                  name="${input.name}" 
                  class="${input.class}" 
                  placeholder="${input.placeholder}"
                  value="${input.value ? store.toEditTask[0][inputLabel] : ''}"
                  >
              </li>
            `;
            // .join('') removed the random commas between list elements
            }).join('')} 
            <li>
              <button type="submit">Submit</button>
            </li>
          </ul>
        </fieldset>
    </form>
  `;
};

function loginSigninScreen () {
  return `
    <h2>Site introduction</h2>
    <section class="login-signin">
      ${createForm(loginForm)}
      ${createForm(signupForm)}
    </section>
  `;
}

function createTaskScreen () {
  return `
    <h2>Task Screen</h2>
    <section class="task-screen">
      ${createForm(createtaskForm)}
    </section>
  `;
}

function editTaskScreen () {
  return `
    <h2>Edit Task Screen</h2>
    <section class="edit-task-screen">
      ${createEditForm(createtaskForm)}
    </section>
  `;
}

function tasksScreen () {
  console.log('tasks', store.tasks);
  console.log('GROUPED TASKS', store.categorizeTasks());
  const taskList = store.tasks.map((task) => `
    <div class="task" data-id="${task.id}">
      <h2>${task.category}</h2>
      <h3>${task.title}</h3>
      <p>${task.id}</p>
      <input class="task-delete task-button" type="button" value="delete">
      <input class="task-edit task-button" type="button" value="edit">
    </div>
    `);
  const taskPage = `
    <h2>Task Page</h2>
    <input class="task-add task-button" type="button" value="Add Task">
    <input class="user-logout task-button" type="button" value="Log Out">
    ${taskList.join('')}
  `;
  return taskPage;
}

const render = () => {
  switch (store.screen) {
    case 'login':
      $('.container').html(loginSigninScreen());
      break;
    case 'tasks':
      $('.container').html(tasksScreen());
      break;
    case 'create-task':
      $('.container').html(createTaskScreen());
      break;
    case 'edit-task':
      $('.container').html(editTaskScreen());
      break;
    default:
      console.log('ERROR');
  }
};
