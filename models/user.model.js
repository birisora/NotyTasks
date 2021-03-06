const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

UserSchema.pre('find', function (next) {
  this.populate('tasks');
  next();
});

UserSchema.pre('findOne', function (next) {
  this.populate('tasks');
  next();
});

UserSchema.methods.serialize = function () {
  return {
    username: this.username,
    firstName: this.firstName,
    lastName: this.lastName,
    tasks: this.tasks,
    id: this._id
  };
};

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('User', UserSchema);
