const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema({
    publisherId: String,
    value: String,
    completed: Boolean,
  });
  
module.exports = mongoose.model('Todos', todosSchema);