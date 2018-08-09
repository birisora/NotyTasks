const Task = require('../models/task.model');
// console.log("Inside task controller js");
const User = require('../models/user.model');

// Using GET
exports.getTasks = (req, res) => {
  console.log('INSIDE GET TASKS');
  console.log(req.user);
  const userId = req.user.id;
  console.log({ userId });
  Task
    // get the user's tasks, not all of the tasks
    .find()
    .then((tasks) => {
      res.json(tasks.map((task) => {
        // id, title, image, content, time, category
        return {
          id: task._id,
          title: task.title,
          image: task.image,
          content: task.content,
          time: task.time,
          category: task.category
        };
      }));
      console.log('successfully grabbed tasks');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something goofed up in GET Tasks' });
    });
};

exports.getTaskId = (req, res) => {
  Task
    .findById(req.params.id)
    .then((task) => {
      res.json({
        // id, title, image, content, time, category
        id: task._id,
        title: task.title,
        image: task.image,
        time: task.time,
        category: task.category
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something goofed up in GET tasks/:id' });
    });
};

// Using POST
exports.postTask = (req, res) => {
  console.log("some user from POST", req.user);
  Task
    .create(req.body)
    .then((task) => {
      User
        .findByIdAndUpdate(req.user.id, { $push: { tasks: task._id } })
        .then(() => {
          res.json(task);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong in POST /tasks' });
    });
};

// Using DELETE
exports.deleteTask = (req, res) => {
  const taskId = req.params.id;
  Task
    .findByIdAndRemove(taskId)
    .then(() => {
      User
        .findByIdAndUpdate(req.user.id, { $pull: { tasks: taskId } })
        .then(() => {
          res.status(204).end();
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong in DELETE /tasks' });
    });
};

// Using PUT
exports.putTask = (req, res) => {
  // check if request path id and body id matches first
  const taskId = req.params.id;

  if (!(taskId && req.body.id && taskId === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and req body id values must match'
    });
  }

  const updated = {};
  // title, image, content, time, category
  const updateableFields = ['title', 'image', 'content', 'time', 'category'];
  updateableFields.forEach((field) => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Task
    .findByIdAndUpdate(taskId, { $set: updated }, { new: true })
    .then((task) => {
      res.status(200).json({
        id: task._id,
        title: task.title,
        image: task.image,
        content: task.content,
        time: task.time,
        category: task.category
      });
      console.log(`Updated task item \`${req.params.id}\``);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong in PUT /tasks/:id' });
    });
};
