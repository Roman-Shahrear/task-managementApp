const express = require('express')
const {
    getAllTask,
    createTask,
    getTask,
    updateTask,
    deleteTask,
} = require('../controllers/task')
const { signUp, login} =require('../controllers/auth')
const router = express.Router()

router.route('/signup').post(signUp)
router.route('/login').post(login)
router.route('/').get(getAllTask).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router