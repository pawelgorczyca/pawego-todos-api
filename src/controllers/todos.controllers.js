const Todos = require('../models/todos');
const TodosUtils = require('../utils/todos.utils');

const TODOS_CONTENT_TYPE = {
    'all': {},
    'active': {completed: false},
    'completed': {completed: true}
}
const RESPONSE_ADDED = 'Added';
const RESPONSE_UPDATED = 'Updated';
const RESPONSE_REMOVED = 'Removed';
const RESPONSE_FOUND = 'Found';
const RESPONSE_REMOVE_ALL_COMPLETED = 'Removed all completed';

const addTodos = async (req, res) => {   
    const value = req.body.value;
    const publisherId = req.body.publisherId;

    let result = {};

    try {
        const todo = new Todos({
            publisherId: publisherId,
            value: value,
            completed: false,
        });

        result = await todo.save();
    } catch(error) {
        console.error(error.message);
    }

    TodosUtils.generateResponse(res, result, RESPONSE_ADDED);
}

const updateTodo = async (req, res) => {
    const idToUpdate = req.body.id;
    const publisherId = req.body.publisherId;
    const completed = req.body.completed;
    const value = req.body.value;

    let result = {};

    try {
        result = await Todos.findByIdAndUpdate(idToUpdate,{value: value, completed: completed, publisherId: publisherId});
    } catch(error) {
        console.error(error.message);
    }

    TodosUtils.generateResponse(res, result, RESPONSE_UPDATED);
}

const removeTodo = async (req, res) => {
    const idToDelete = req.body.id;
    const publisherId = req.body.publisherId;

    let result = {};

    try {
        result = await Todos.deleteOne({_id: idToDelete, publisherId: publisherId});
    } catch(error) {
        console.error(error.message);
    }

    TodosUtils.generateResponse(res, result, RESPONSE_REMOVED);
}

const getAllTodos = async (req, res) => {
    const publisherId = req.query.publisherId;
    const todosType = req.query.todosType;

    let result = [];

    try {
        result = await Todos.find({publisherId: publisherId, ...TODOS_CONTENT_TYPE[todosType]});
    } catch(error) {
        console.error(error.message);
    }

    TodosUtils.generateResponse(res, result, RESPONSE_FOUND);
}

const removeAllCompletedTodos = async(req, res) => {
    const publisherId = req.body.publisherId;

    let result = {};

    try {
        result = await Todos.deleteMany({publisherId: publisherId, completed: true});
    } catch (error) {
        console.error(error.message);
    }

    TodosUtils.generateResponse(res, result, RESPONSE_REMOVE_ALL_COMPLETED);
}

module.exports = {
    addTodos,
    updateTodo,
    removeTodo,
    getAllTodos,
    removeAllCompletedTodos
}