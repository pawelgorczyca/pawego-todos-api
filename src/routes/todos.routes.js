const express = require('express');
const router = express.Router(); 
const todosControllers = require('../controllers/todos.controllers');

router.get('/get_all', todosControllers.getAllTodos);
router.post('/add', todosControllers.addTodos);
router.post('/update', todosControllers.updateTodo);
router.post('/remove', todosControllers.removeTodo);
router.post('/remove_all_completed', todosControllers.removeAllCompletedTodos);

module.exports = router;