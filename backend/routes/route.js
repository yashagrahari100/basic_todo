const express = require('express');
const { createTodo, getTodos, updateTodos, deleteTodo } = require('../controller/todo_controller.js');
const { authenticate } = require('../middleware/authorized.js');
const router = express.Router();

router.post('/create',authenticate,createTodo)
router.get('/fetch',authenticate,getTodos)
router.put('/update/:id',authenticate,updateTodos)
router.delete('/delete/:id',authenticate, deleteTodo)





module.exports = {
    router
}